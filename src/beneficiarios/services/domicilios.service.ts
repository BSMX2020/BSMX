import { Injectable, NotFoundException, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Domicilio } from '../entities/domicilio.entity';
import { CreateDomicilioDto, UpdateDomicilioDto } from '../dtos/domicilio.dto';


@Injectable()
export class DomiciliosService {

  constructor(
    @InjectRepository(Domicilio) private domicilioRepo: Repository<Domicilio>,    
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

    const newDomicilio = this.domicilioRepo.create(data);
    return this.domicilioRepo.save(newDomicilio);
  }

  async update(id: number, changes: UpdateDomicilioDto) {
    const domicilio = await this.domicilioRepo.findOneBy({id});
    this.domicilioRepo.merge(domicilio, changes);    
    return this.domicilioRepo.save(domicilio);
  }

}
