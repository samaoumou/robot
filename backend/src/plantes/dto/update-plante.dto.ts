import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanteDto } from './create-plante.dto';

export class UpdatePlanteDto extends PartialType(CreatePlanteDto) {}
