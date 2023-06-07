import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { Beneficiario } from '../entities/beneficiario.entity';
import { Persona } from '../entities/persona.entity';

import { CreatePersonaDto } from '../dtos/persona.dto';
import { BeneficiariosService } from './beneficiarios.service';

@Injectable()
export class PersonasService {

  constructor(
    @InjectRepository(Persona) private personaRepo: Repository<Persona>,
    private beneficiariosService: BeneficiariosService,
  ) { }

  findAll() {    
    return this.personaRepo.find({
      relations: ['beneficiario'],
    });
  }

  async findOne(curp: string) {
    const persona = await this.personaRepo.findOne({ 
      where: { curp: curp } 
    });
    if (!persona) {
      throw new NotFoundException(`Persona #${curp} not found`);
    }
    return persona;
  }

  async create(data: CreatePersonaDto) {
    const newPersona = this.personaRepo.create(data);
    if (data.beneficiarioId) {
      const beneficiario = await this.beneficiariosService.findOne(data.beneficiarioId);
      newPersona.beneficiario = beneficiario;
    }
    return this.personaRepo.save(newPersona);
  }

}
