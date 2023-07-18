import { Test, TestingModule } from '@nestjs/testing';
import { RequisitosEmpresaService } from './requisitos-empresa.service';

describe('RequisitosEmpresaService', () => {
  let service: RequisitosEmpresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequisitosEmpresaService],
    }).compile();

    service = module.get<RequisitosEmpresaService>(RequisitosEmpresaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
