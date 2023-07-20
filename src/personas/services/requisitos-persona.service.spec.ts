import { Test, TestingModule } from '@nestjs/testing';
import { RequisitosPersonaService } from './requisitos-persona.service';

describe('RequisitosPersonaService', () => {
  let service: RequisitosPersonaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequisitosPersonaService],
    }).compile();

    service = module.get<RequisitosPersonaService>(RequisitosPersonaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
