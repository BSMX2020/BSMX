import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { Beneficiario } from '../entities/beneficiario.entity';
import { CreateBeneficiarioDto } from '../dtos/beneficiario.dto';

@Injectable()
export class BeneficiariosService {

  constructor(
    @InjectRepository(Beneficiario) private beneficiarioRepo: Repository<Beneficiario>,
  ) { }

  findAll() {
    return this.beneficiarioRepo.find();
  }

  async findOne(id: number) {
    const beneficiario = await this.beneficiarioRepo.findOne({ where: { id } });
    if (!beneficiario) {
      throw new NotFoundException(`Beneficiario #${id} not found`);
    }
    return beneficiario;
  }

  create(data: CreateBeneficiarioDto) {
    const newBeneficiario = this.beneficiarioRepo.create(data);
    return this.beneficiarioRepo.save(newBeneficiario);
  }



}
