import { Injectable, NotFoundException, Inject, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { LineaCredito } from '../entities/lineaCredito.entity';
import { CreateLineaCreditoDto } from '../dtos/lineaCredito.dto';

import { BeneficiariosService } from './beneficiarios.service';

@Injectable()
export class LineasCreditoService {
  constructor(
    @InjectRepository(LineaCredito) private lineaCreditoRepo: Repository<LineaCredito>,
    private beneficiariosService: BeneficiariosService,    
  ) { }

  findAll() {    
    return this.lineaCreditoRepo.find({
      relations: ['beneficiario'],
    });
  }

  async findOne(folio: string) {
    const lineaCredito = await this.lineaCreditoRepo.findOne({ 
      where: { folio },
      relations: ['beneficiario'],       
    });
    if (!lineaCredito) {
      throw new NotFoundException(`Linea de crédito #${folio} no encontrada`);
    }
    return lineaCredito;
  }  

  async create(data: CreateLineaCreditoDto) {

    const lineaCredito = await this.lineaCreditoRepo.findOne({ where: { folio: data.folio }});    
    if (lineaCredito) {      
      throw new BadRequestException(`Ya existe una linea de credito con folio ${data.folio}`);
    }  

    const beneficiario = await this.beneficiariosService.findOneRelations(data.beneficiario);
    if (!beneficiario) {      
      throw new NotFoundException(`Id de Beneficiario ${data.beneficiario} no encontrado`);
    }        

    if (beneficiario.lineaCredito) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `El beneficiario #${data.beneficiario} ya cuenta con una línea de crédito`,
      }, HttpStatus.BAD_REQUEST);
    }
   
    const newLineaCredito = this.lineaCreditoRepo.create(data);
    return this.lineaCreditoRepo.save(newLineaCredito);
  }

}
