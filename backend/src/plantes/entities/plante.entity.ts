/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Plante {
  
    @Prop()
    nomPlante: string;

    @Prop()
    nombreArrosage: string;

    @Prop()
    heureArrosage: string;

    @Prop()
    etat: boolean;
}


export type PlanteDocument = Plante & Document;
export const PlanteSchema = SchemaFactory.createForClass(Plante)