/* eslint-disable prettier/prettier */
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';
import { AuthService } from './auth.service';
import { serialService } from '../serial/serial.service';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: true,
  namespace: 'auth',
})
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService, private schedulerRegistry: SchedulerRegistry){}

  private port = serialService.getPort();

  private parser = serialService.getParser();

  @WebSocketServer()
  public server: Server;

  @SubscribeMessage('arrosage_on')
  handleArrosageOn(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ): any {
    serialService.writeToPort('1' );
  }

  @SubscribeMessage('arrosage_off')
  handleArrosageOff(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ): any {
    serialService.writeToPort('0');
  }

  @SubscribeMessage('toit_ouvert')
  handleToitOn(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ): any {
    serialService.writeToPort('o');
  }

  @SubscribeMessage('toit_ferme')
  handleToitOff(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ): any {
    serialService.writeToPort('f');
  }

  /*@SubscribeMessage('port_status')
  handlePortStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ): any {
    if (this.port.isOpen) {
      client.emit('systeme_on', 'Port ouvert');
    } else {
      client.emit('systeme_off', 'Port fermé');
    }
  }*/

  //Vérifie si le port est ouvert toutes les 5 secondes
  @Cron(CronExpression.EVERY_5_SECONDS)
  checkPortStatus(@ConnectedSocket() client: Socket) {
    const logger = new Logger(AuthGateway.name);
    
    if (!this.port.isOpen) {
        this.port.open((err) => {
          if (err && err.message !== 'Port is already open') {
            this.server.emit('systeme_off', err.message);
            logger.log('Arduino Absent!');
            return console.log('Error opening port: ', err.message);
          } else {
            this.server.emit('systeme_on', 'Port ouvert');
          }
        });
    } else {
      this.server.emit('systeme_on', 'Port ouvert');
    }
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]): any {
    client.emit('hello', 'Hello client!');
    this.parser.on('data', (data) => {
      const values = data.split('/');
      let pompe = parseFloat(values[4]);
      let toit = parseFloat(values[5]);
      const fan = parseFloat(values[6]);
      const luminosity = parseFloat(values[3]);
      const humidityS = parseFloat(values[2]);
      if (luminosity < 300) {
        this.port.write('o');
        this.parser.on('data', (data) => {
          toit = parseFloat(data.split('/')[5]);
        });
      }
      if (humidityS <= 5) {
        this.port.write('1');
        this.parser.on('data', (data) => {
          pompe = parseFloat(data.split('/')[4]);
        });
      }

      client.emit('pompe_status', pompe);
      client.emit('toit_status', toit);
      client.emit('fan_status', fan);
    });
    /*if (!this.port.isOpen) {
      setInterval(() => {
        this.port.open((err) => {
          if (err && err.message !== 'Port is already open') {
            client.emit('error_systeme', err.message);
            return console.log('Error opening port: ', err.message);
          } else {
            client.emit('systeme_on', 'Port ouvert');
          }
        });
      }, 1000);
    }*/

/*     this.parser.on('data', (data) => {
      const values = data.split('/');
      const rfid = values[7];
      
      if(rfid){
        this.authService.loginRfid({ rfId: rfid }).then((res) => {
          client.emit('auth', res);
        });
      }
    }); */
  }

  handleDisconnect(@ConnectedSocket() client: any): any {
    client.leave();
  }
}
