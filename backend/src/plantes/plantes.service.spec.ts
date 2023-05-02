import { Test, TestingModule } from '@nestjs/testing';
import { PlantesService } from './plantes.service';

describe('PlantesService', () => {
  let service: PlantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantesService],
    }).compile();

    service = module.get<PlantesService>(PlantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
