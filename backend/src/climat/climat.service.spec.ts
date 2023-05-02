import { Test, TestingModule } from '@nestjs/testing';
import { ClimatService } from './climat.service';

describe('ClimatService', () => {
  let service: ClimatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimatService],
    }).compile();

    service = module.get<ClimatService>(ClimatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
