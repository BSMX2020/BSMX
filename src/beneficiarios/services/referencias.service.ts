import { Injectable, NotFoundException, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { Beneficiario } from '../entities/beneficiario.entity';
import { Referencia } from '../entities/referencia.entity';

import { CreateReferenciaDto } from '../dtos/referencia.dto';
import { PersonasService } from './personas.service';

@Injectable()
export class ReferenciasService {

  constructor(
    @InjectRepository(Referencia) private referenciaRepo: Repository<Referencia>,
    private personasService: PersonasService,
  ) { }

  findAll() {    
    return this.referenciaRepo.find({
      relations: ['persona'],
    });
  }

  async findOne(id: number) {
    const referencia = await this.referenciaRepo.findOne({ 
      where: { id: id },
      relations: ['persona'], 
    });
    if (!referencia) {
      throw new NotFoundException(`Referencia #${id} no encontrada`);
    }
    return referencia;
  }  

  async create(data: CreateReferenciaDto) {

    const persona = await this.personasService.findOne(data.persona);
    if (!persona) {      
      throw new NotFoundException(`CURP de Persona ${data.persona} no encontrada`);
    }    

    const newReferencia = this.referenciaRepo.create(data);
    return this.referenciaRepo.save(newReferencia);
  }


}
