import { Injectable, NotFoundException, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { Beneficiario } from '../entities/beneficiario.entity';
import { Domicilio } from '../entities/domicilio.entity';

import { CreateDomicilioDto } from '../dtos/domicilio.dto';
import { BeneficiariosService } from './beneficiarios.service';

@Injectable()
export class DomiciliosService {

  constructor(
    @InjectRepository(Domicilio) private domicilioRepo: Repository<Domicilio>,
    private beneficiariosService: BeneficiariosService,
  ) { }

  findAll() {    
    return this.domicilioRepo.find({
      relations: ['beneficiarios'],
    });
  }

  async findOne(id: number) {
    const domicilio = await this.domicilioRepo.findOne({ 
      where: { id: id },  
      relations: ['beneficiarios'],     
    });
    if (!domicilio) {
      throw new NotFoundException(`Domicilio ${id} no encontrado`);
    }
    return domicilio;
  }  

  async create(data: CreateDomicilioDto) {

    // const beneficiario = await this.beneficiariosService.findOneRelations(data.beneficiario);
    // if (!beneficiario) {      
    //   throw new NotFoundException(`Id de Beneficiario ${data.beneficiario} no encontrado`);
    // }         

    // if (beneficiario.domicilio) {
    //   throw new HttpException({
    //     status: HttpStatus.BAD_REQUEST,
    //     error: `Ya existe ese domicilio asignado`,
    //   }, HttpStatus.BAD_REQUEST);        
    // }  

    const newDomicilio = this.domicilioRepo.create(data);
    return this.domicilioRepo.save(newDomicilio);
  }

}
