import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PickType(CreateUserDto, ['password']) {
  @IsNotEmpty({ message: 'Le nouveau mot de passe est requis' })
  newPassword: string;
}
