import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Climat {
    @Prop()
    temperature: number;

    @Prop()
    humidityA: number;

    @Prop()
    humidityS: number;

    @Prop()
    luminosity: number;

    @Prop({ default: Date.now })
    savedAt: Date;
}

export type ClimatDocument = Climat & Document;
export const ClimatSchema = SchemaFactory.createForClass(Climat);