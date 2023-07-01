import { Test, TestingModule } from '@nestjs/testing';
import { ReferenciasService } from './referencias.service';

describe('ReferenciasService', () => {
  let service: ReferenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferenciasService],
    }).compile();

    service = module.get<ReferenciasService>(ReferenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
