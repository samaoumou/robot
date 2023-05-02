/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClimatService } from './climat.service';
import { CreateClimatDto } from './dto/create-climat.dto';

@Controller('climat')
export class ClimatController {
  constructor(private readonly climatService: ClimatService) {}

  @Post()
  create(@Body() createClimatDto: CreateClimatDto) {
    return this.climatService.create(createClimatDto);
  }

  @Get()
  findAll() {
    return this.climatService.findAll();
  }

  @Get('moyenne')
  findMoy() {
    return this.climatService.aggregateValues();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.climatService.findOne(id);
  }
}
