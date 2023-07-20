import { Test, TestingModule } from '@nestjs/testing';
import { RepresentantesLegalesController } from './representantes-legales.controller';

describe('RepresentantesLegalesController', () => {
  let controller: RepresentantesLegalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepresentantesLegalesController],
    }).compile();

    controller = module.get<RepresentantesLegalesController>(RepresentantesLegalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
