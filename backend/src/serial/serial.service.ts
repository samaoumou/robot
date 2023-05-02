/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
@Injectable()
export class SerialService {
  private port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    autoOpen: false,
    //flowControl: false,
  });
  private parser = this.port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
  getPort() {
    if (!this.port.isOpen) {
      this.openPort();
    }
    return this.port;
  }

  openPort() {
    this.port.open((err) => {
      if (err && err.message !== 'Port is already open') {
        return console.log('Error opening port: ', err.message);
      }
    });
  }

  getParser() {
    return this.parser;
  }

  writeToPort(data: any) {
    // Write data to the serial port
    this.port.write(data, (error) => {
      if (error) {
        console.error('Error writing to port: ', error.message);
        // If there was an error writing to the port, attempt to write the message again after a short delay
        setTimeout(() => {
          this.writeToPort(data);
        }, 500);
      } else {
        console.log('Data sent to port');
      }
    });
  }
}

const serialService = Object.freeze(new SerialService());

export { serialService };
