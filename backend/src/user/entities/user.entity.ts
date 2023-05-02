import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  nom: string;

  @Prop()
  prenom: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

 /*  @Prop()
  rfId: string; */
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
