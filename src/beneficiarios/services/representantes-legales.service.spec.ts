import { Test, TestingModule } from '@nestjs/testing';
import { RepresentantesLegalesService } from './representantes-legales.service';

describe('RepresentantesLegalesService', () => {
  let service: RepresentantesLegalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepresentantesLegalesService],
    }).compile();

    service = module.get<RepresentantesLegalesService>(RepresentantesLegalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
