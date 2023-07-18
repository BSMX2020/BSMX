import { Test, TestingModule } from '@nestjs/testing';
import { RequisitosEmpresaController } from './requisitos-empresa.controller';

describe('RequisitosEmpresaController', () => {
  let controller: RequisitosEmpresaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequisitosEmpresaController],
    }).compile();

    controller = module.get<RequisitosEmpresaController>(RequisitosEmpresaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
