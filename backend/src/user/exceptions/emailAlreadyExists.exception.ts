import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsException extends HttpException {
  constructor() {
    super(
      'Cette adresse email est déja associé à un compte',
      HttpStatus.CONFLICT,
    );
  }
}
