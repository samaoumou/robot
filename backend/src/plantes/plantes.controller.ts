/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PlantesService } from './plantes.service';
import { CreatePlanteDto } from './dto/create-plante.dto';
import { UpdatePlanteDto } from './dto/update-plante.dto';

@Controller('plantes')
export class PlantesController {
  constructor(private readonly plantesService: PlantesService) {}

  @Post()
  create(@Body() createPlanteDto: CreatePlanteDto) {
    return this.plantesService.create(createPlanteDto);
  }

  @Get()
  findAll() {
    return this.plantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanteDto: UpdatePlanteDto) {
    return this.plantesService.update(id, updatePlanteDto);
  }
}
