import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { Beneficiario } from '../entities/beneficiario.entity';
import { Empresa } from '../entities/empresa.entity';

import { CreateEmpresaDto } from '../dtos/empresa.dto';
import { BeneficiariosService } from './beneficiarios.service';


@Injectable()
export class EmpresasService {

  constructor(
    @InjectRepository(Empresa) private empresaRepo: Repository<Empresa>,
    private beneficiariosService: BeneficiariosService,
  ) { }

  findAll() {    
    return this.empresaRepo.find({
      relations: ['beneficiario', 'representanteLegal'],
    });
  }

  async findOne(rfc: string) {
    const empresa = await this.empresaRepo.findOne({ 
      where: { rfc: rfc },
      relations: ['beneficiario', 'representanteLegal'],       
    });
    if (!empresa) {
      throw new NotFoundException(`Empresa #${rfc} not found`);
    }
    return empresa;
  }

  async create(data: CreateEmpresaDto) {
    const newEmpresa = this.empresaRepo.create(data);        
    return this.empresaRepo.save(newEmpresa);
  }


}
