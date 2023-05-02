import { Test, TestingModule } from '@nestjs/testing';
import { PlantesController } from './plantes.controller';
import { PlantesService } from './plantes.service';

describe('PlantesController', () => {
  let controller: PlantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantesController],
      providers: [PlantesService],
    }).compile();

    controller = module.get<PlantesController>(PlantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
