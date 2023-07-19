import { Test, TestingModule } from '@nestjs/testing';
import { LineasCreditoController } from './lineas-credito.controller';

describe('LineasCreditoController', () => {
  let controller: LineasCreditoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineasCreditoController],
    }).compile();

    controller = module.get<LineasCreditoController>(LineasCreditoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
