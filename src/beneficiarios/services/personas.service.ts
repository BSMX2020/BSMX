import { Injectable, NotFoundException, Inject, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
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
      relations: ['beneficiario', 'referencias', 'requisitosPersona'],
    });
  }

  async findOne(curp: string) {
    const persona = await this.personaRepo.findOne({ 
      where: { curp: curp },
      relations: ['beneficiario', 'referencias', 'requisitosPersona'],       
    });
    if (!persona) {
      throw new NotFoundException(`Persona #${curp} no encontrada`);
    }
    return persona;
  }  

  async create(data: CreatePersonaDto) {

    const persona = await this.personaRepo.findOne({ where: { curp: data.curp }});    
    if (persona) {      
      throw new BadRequestException(`Ya existe una persona registrada con el CURP ${data.curp}`);
    }  

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

    if (beneficiario.empresa) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Ya existe una empresa con el idBeneficiario = ${data.beneficiario} asignado`,
      }, HttpStatus.BAD_REQUEST);        
    }  

    const newPersona = this.personaRepo.create(data);
    return this.personaRepo.save(newPersona);
  }

}
