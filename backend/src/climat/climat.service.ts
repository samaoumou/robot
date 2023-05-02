/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClimatDto } from './dto/create-climat.dto';
import { Climat, ClimatDocument } from './entities/climat.entity';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import * as socketio from 'socket.io';
import { serialService } from '../serial/serial.service';

@WebSocketGateway({ cors: true, namespace: 'climat' })
@Injectable()
export class ClimatService implements OnGatewayConnection {
  private port: SerialPort;
  private parser: ReadlineParser;

  constructor(
    @InjectModel(Climat.name) private ClimatSchema: Model<ClimatDocument>,
  ) {
    this.port = serialService.getPort();
    console.log(this.port.isOpen);
    this.parser = serialService.getParser();
  }

  async handleConnection(client: socketio.Socket, ...args: any[]) {
    this.parser.on('data', (data) => {
      const values = data.split('/');
      console.log(values);
      const temperature = parseFloat(values[0]);
      console.log(temperature);
      const humidityA = parseFloat(values[1]);
      console.log(humidityA);
      const humidityS = parseFloat(values[2]);
      console.log(humidityS);
      const luminosity = parseFloat(values[3]);
      console.log(luminosity);
      client.emit('data', { temperature, humidityA, humidityS, luminosity });

      const now = new Date();
      // les heures de sauvegarde souhaitées
      const saveTimes = [
        { hour: 9, minute: 18, second: 0 },
        { hour: 12, minute: 43, second: 0 },
      ];
      for (const saveTime of saveTimes) {
        if (
          now.getHours() === saveTime.hour &&
          now.getMinutes() === saveTime.minute &&
          now.getSeconds() === saveTime.second
        ) {
          if (
            !isNaN(temperature) &&
            !isNaN(humidityA) &&
            !isNaN(humidityS) &&
            !isNaN(luminosity)
          ) {
            this.create({ temperature, humidityA, humidityS, luminosity });
            console.log(
              `Saved data at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
            );
          }
        }
      }
    });
  }
  //Calcule de la moyenne des valeurs
  async aggregateValues(): Promise<any> {
    const result = await this.ClimatSchema.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$savedAt' },
            month: { $month: '$savedAt' },
            day: { $dayOfMonth: '$savedAt' },
          },
          temperature: { $avg: '$temperature' },
          humidityA: { $avg: '$humidityA' },
          humidityS: { $avg: '$humidityS' },
          luminosity: { $avg: '$luminosity' },
        },
      },
    ]);
    return result;
  }

  create(createClimatDto: CreateClimatDto) {
    const createdClimat = new this.ClimatSchema(createClimatDto);
    return createdClimat.save();
  }

  findAll() {
    return this.ClimatSchema.find().exec();
  }

  findOne(id: string) {
    return this.ClimatSchema.findById(id).exec();
  }
}
