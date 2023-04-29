import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    // define a constructor to inject the model into the service
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }


    // creation d'un utilisateur
async create(userDTO: RegisterDTO): Promise < User > {
    // get email from the input
    const { email } = userDTO;
    // check a user with that email
    const user = await this.userModel.findOne({ email });
    // Check if user already exists
    if(user) {
        // User already exists
        throw new HttpException('Email existe déjà', HttpStatus.BAD_REQUEST);
    }
        // Create the new user
        const createdUser = new this.userModel(userDTO);
    // Save the new user
    await createdUser.save();
    // Return the saved user
    return createdUser;
}
    //connection d'un utilisateur
    async findByLogin(userDTO: LoginDTO): Promise < User > {
        const { email, password } = userDTO; // Get the email and password.
        // find user by email
        const user = await this.userModel.findOne({ email }).select('+password');
        if(!user) { // Check if user exists
            // User not found
            throw new HttpException('Email incorrect', HttpStatus.UNAUTHORIZED);
        }
            // check if password is correct
            const passworMatch = await bcrypt.compare(password, user.password);
        if(!passworMatch) {
            // Invalid credentials
            throw new HttpException('Mot de passe incorrect', HttpStatus.UNAUTHORIZED);
        }
            // return the user
            return user;
    }
// trouver un utilisateur à travers le token
    async findByPayload(payload: any) {
        // Extract email from payload
        const { email } = payload;
        // Get user from the email
        const user = await this.userModel.findOne({ email });
        // return the user
        return user;
    }
    
}