import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRfidCardException extends HttpException {
  constructor() {
    super('Accés non autorisé', HttpStatus.BAD_REQUEST);
  }
}
