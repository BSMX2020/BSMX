import { Test, TestingModule } from '@nestjs/testing';
import { RequisitosPersonaController } from './requisitos-persona.controller';

describe('RequisitosPersonaController', () => {
  let controller: RequisitosPersonaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequisitosPersonaController],
    }).compile();

    controller = module.get<RequisitosPersonaController>(RequisitosPersonaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
