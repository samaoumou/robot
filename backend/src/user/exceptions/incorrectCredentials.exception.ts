import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectCredentialsException extends HttpException {
  constructor(message = 'Mot de passe incorrect') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
