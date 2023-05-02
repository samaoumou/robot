import { Schema } from '@nestjs/mongoose';
import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

@Schema()
export class RfidDto {}
