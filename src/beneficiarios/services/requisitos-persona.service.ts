import { Injectable, NotFoundException, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequisitosPersona } from '../entities/requisitosPersona.entity';
import { CreateRequisitosPersonaDto } from '../dtos/requisitosPersona.dto';

import { PersonasService } from './personas.service';

@Injectable()
export class RequisitosPersonaService {

  constructor(
    @InjectRepository(RequisitosPersona) private requisitosPersonaRepo: Repository<RequisitosPersona>,
    private personasService: PersonasService,
  ) { }

  findAll() {
    return this.requisitosPersonaRepo.find({
      relations: ['persona'],
    });
  }

  async findOne(persona: string) {
    const requisitosPersona = await this.requisitosPersonaRepo.findOne({ where: { persona } });
    if (!requisitosPersona) {
      throw new NotFoundException(`Requisitos persona con CURP de persona ${persona} no encontrados`);
    }
    return requisitosPersona;
  }

  async findOneRelations(persona: string) {
    const requisitosPersona = await this.requisitosPersonaRepo.findOne({ 
      where: { persona },
      relations: ['persona'],   
    });
    if (!requisitosPersona) {
      throw new NotFoundException(`Requisitos persona con CURP de persona ${persona} no encontrados`);
    }
    return requisitosPersona;
  }

  async create(data: CreateRequisitosPersonaDto) {
    
    const persona = await this.personasService.findOne(data.persona);
    if (!persona) { 
      throw new NotFoundException(`Persona con CURP ${data.persona} no encontrada`);
    }

    if (persona.requisitosPersona) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Ya existe la persona con CURP ${persona.curp} con requisitos asignados`,
      }, HttpStatus.BAD_REQUEST);        
    }  
    
    const newRequisitosPersona = this.requisitosPersonaRepo.create(data);    
    return this.requisitosPersonaRepo.save(newRequisitosPersona);
  }
  

}
