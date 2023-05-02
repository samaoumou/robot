import { PartialType } from '@nestjs/mapped-types';
import { CreateClimatDto } from './create-climat.dto';

export class UpdateClimatDto extends PartialType(CreateClimatDto) {}
