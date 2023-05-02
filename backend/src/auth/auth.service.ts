/* eslint-disable prettier/prettier */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { RfidDto } from '../user/dto/rfid-user.dto';

@Injectable()
export class AuthService {
  logger = new ConsoleLogger();
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  //creation du token pour l'utilisateur
  async login(loginUserDto: LoginUserDto) {
    const payload = await this.userService.login(loginUserDto);
    //signature du token de l'utilisateur
    return { access_token: this.jwtService.sign(payload) };
  }

/*   async loginRfid(rfidDto: RfidDto) {
    const payload = await this.userService.loginRfid(rfidDto);
    if (payload.error) {
      return payload;
    }
    //signature du token de l'utilisateur
    return { access_token: this.jwtService.sign(payload) };
  } */
}
