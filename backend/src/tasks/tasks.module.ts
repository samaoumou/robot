/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PlantesModule } from 'src/plantes/plantes.module';
import { TasksService } from './tasks.service';
import { PlantesService } from 'src/plantes/plantes.service';
import { Plante, PlanteSchema } from 'src/plantes/entities/plante.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SerialService } from 'src/serial/serial.service';

@Module({
  imports: [
    PlantesModule,
    MongooseModule.forFeature([{ name: Plante.name, schema: PlanteSchema }]),
  ],
  providers: [TasksService, PlantesService, SerialService],
})
export class TasksModule {}
