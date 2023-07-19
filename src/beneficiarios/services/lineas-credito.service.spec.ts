import { Test, TestingModule } from '@nestjs/testing';
import { LineasCreditoService } from './lineas-credito.service';

describe('LineasCreditoService', () => {
  let service: LineasCreditoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineasCreditoService],
    }).compile();

    service = module.get<LineasCreditoService>(LineasCreditoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
