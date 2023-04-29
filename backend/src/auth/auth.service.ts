import {Injectable} from '@nestjs/common';
import {sign} from 'jsonwebtoken';
import {UserService} from 'src/shared/user.service';

export class AuthService {
    // define user service
    constructor(private userService: UserService) {}

    async signPayload(payload: any) {
        // token to expire in 12 hours
        let token = sign(payload, 'secretKey', { expiresIn: '12h' });
        return token;
    }
//définis une méthode de validation d'un utilisateur basée sur la charge utile JWT
    async validateUser(payload: any) {
        return await this.userService.findByPayload(payload);
    }
    }