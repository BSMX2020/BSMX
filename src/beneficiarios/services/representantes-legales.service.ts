import { Injectable, NotFoundException, BadRequestException, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { RepresentanteLegal } from '../entities/representante-legal.entity';
import { CreateRepresentanteLegalDto } from '../dtos/representante-legal.dto';

@Injectable()
export class RepresentantesLegalesService {

  constructor(
    @InjectRepository(RepresentanteLegal) private representanteLegalRepo: Repository<RepresentanteLegal>,    
  ) { }

  findAll() {    
    return this.representanteLegalRepo.find({
      relations: ['empresas'],
    });
  }

  async findOne(curp: string) {
    const representanteLegal = await this.representanteLegalRepo.findOne({ 
      where: { curp: curp },
      relations: ['empresas'],       
    });
    if (!representanteLegal) {
      throw new NotFoundException(`Representante Legal #${curp} no encontrado`);
    }
    return representanteLegal;
  }  

  async create(data: CreateRepresentanteLegalDto) {    
        
    const representanteLegal = await this.findOne(data.curp);
    if (representanteLegal) {      
      throw new BadRequestException(`Ya existe un representante legal con el CURP ${data.curp}`);
    }  

    const newRepresentanteLegal = this.representanteLegalRepo.create(data);
    return this.representanteLegalRepo.save(newRepresentanteLegal);
  }
  
}
