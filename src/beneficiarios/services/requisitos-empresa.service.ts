import { Injectable, NotFoundException, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequisitosEmpresa } from '../entities/requisitosEmpresa.entity';
import { CreateRequisitosEmpresaDto } from '../dtos/requisitosEmpresa.dto';

import { EmpresasService } from './empresas.service';

@Injectable()
export class RequisitosEmpresaService {

  constructor(
    @InjectRepository(RequisitosEmpresa) private requisitosEmpresaRepo: Repository<RequisitosEmpresa>,
    private empresasService: EmpresasService,
  ) { }

  findAll() {
    return this.requisitosEmpresaRepo.find({
      relations: ['empresa'],
    });
  }

  async findOne(empresa: string) {
    const requisitosEmpresa = await this.requisitosEmpresaRepo.findOne({ where: { empresa } });
    if (!requisitosEmpresa) {
      throw new NotFoundException(`Requisitos empresa con RFC de empresa ${empresa} no encontrados`);
    }
    return requisitosEmpresa;
  }

  async findOneRelations(empresa: string) {
    const requisitosEmpresa = await this.requisitosEmpresaRepo.findOne({ 
      where: { empresa },
      relations: ['empresa'],   
    });
    if (!requisitosEmpresa) {
      throw new NotFoundException(`Requisitos empresa con RFC de empresa ${empresa} no encontrados`);
    }
    return requisitosEmpresa;
  }

  async create(data: CreateRequisitosEmpresaDto) {
    
    const empresa = await this.empresasService.findOne(data.empresa);
    if (!empresa) { 
      throw new NotFoundException(`Empresa con RFC ${data.empresa} no encontrada`);
    }

    if (empresa.requisitosEmpresa) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Ya existe la empresa con RFC ${empresa.rfc} con requisitos asignados`,
      }, HttpStatus.BAD_REQUEST);        
    }  
    
    const newRequisitosEmpresa = this.requisitosEmpresaRepo.create(data);    
    return this.requisitosEmpresaRepo.save(newRequisitosEmpresa);
  }

}
