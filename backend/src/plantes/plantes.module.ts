/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PlantesService } from './plantes.service';
import { PlantesController } from './plantes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plante, PlanteSchema } from './entities/plante.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plante.name, schema: PlanteSchema }]),
  ],
  controllers: [PlantesController],
  providers: [PlantesService],
  exports: [PlantesService],
})
export class PlantesModule {}
