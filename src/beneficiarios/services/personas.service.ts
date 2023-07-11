import { Injectable, NotFoundException, Inject, HttpException, HttpStatus } from '@nestjs/common';
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
      relations: ['beneficiario', 'referencias'],
    });
  }

  async findOne(curp: string) {
    const persona = await this.personaRepo.findOne({ 
      where: { curp: curp },
      relations: ['beneficiario', 'referencias'],       
    });
    if (!persona) {
      throw new NotFoundException(`Persona #${curp} no encontrada`);
    }
    return persona;
  }  

  async create(data: CreatePersonaDto) {

    const beneficiario = await this.beneficiariosService.findOneRelations(data.beneficiario);
    if (!beneficiario) {      
      throw new NotFoundException(`Id de Beneficiario ${data.beneficiario} no encontrado`);
    }    

    if (beneficiario.persona) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Ya existe una persona con el idBeneficiario = ${data.beneficiario} asignado`,
      }, HttpStatus.BAD_REQUEST);        
    }  

    const newPersona = this.personaRepo.create(data);
    return this.personaRepo.save(newPersona);
  }

}
