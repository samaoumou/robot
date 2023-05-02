import { Test, TestingModule } from '@nestjs/testing';
import { ClimatController } from './climat.controller';
import { ClimatService } from './climat.service';

describe('ClimatController', () => {
  let controller: ClimatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimatController],
      providers: [ClimatService],
    }).compile();

    controller = module.get<ClimatController>(ClimatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
