/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlanteDto } from './dto/create-plante.dto';
import { UpdatePlanteDto } from './dto/update-plante.dto';
import { Plante, PlanteDocument } from './entities/plante.entity';

@Injectable()
export class PlantesService {
  constructor(
    @InjectModel(Plante.name) private PlanteModel: Model<PlanteDocument>,
  ) {}

  //Creation d'une plante
  create(CreatePlanteDto: CreatePlanteDto) {
    const newPlante = new this.PlanteModel(CreatePlanteDto);
    return newPlante.save();
  }
  //Récupération de tout les plantes
  findAll() {
    return this.PlanteModel.find({});
  }

  findOne(id: string) {
    return this.PlanteModel.findOne({ _id: id }).exec();
  }

  findActive() {
    return this.PlanteModel.find({ etat: true }).exec();
  }

  update(id: string, UpdatePlanteDto: UpdatePlanteDto) {
    return this.PlanteModel.findOneAndUpdate({ _id: id }, UpdatePlanteDto);
  }

}
