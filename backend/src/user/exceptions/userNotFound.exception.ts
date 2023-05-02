import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(message = 'Email incorrect') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
