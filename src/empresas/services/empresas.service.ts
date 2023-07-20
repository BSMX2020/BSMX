import { Injectable, NotFoundException, Inject, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empresa } from '../../empresas/entities/empresa.entity';
import { CreateEmpresaDto } from '../../empresas/dto/empresa.dto';

import { BeneficiariosService } from '../../beneficiarios/services/beneficiarios.service';
import { RepresentantesLegalesService } from './representantes-legales.service';


@Injectable()
export class EmpresasService {

  constructor(
    @InjectRepository(Empresa) private empresaRepo: Repository<Empresa>,
    private beneficiariosService: BeneficiariosService,
    private representantesLegalesService: RepresentantesLegalesService,
  ) { }

  findAll() {
    return this.empresaRepo.find({
      relations: ['beneficiario', 'representanteLegal', 'requisitosEmpresa'],
    });
  }

  async findOne(rfc: string) {
    const empresa = await this.empresaRepo.findOne({
      where: { rfc: rfc },
      relations: ['beneficiario', 'representanteLegal', 'requisitosEmpresa'],
    });
    if (!empresa) {
      throw new NotFoundException(`Empresa #${rfc} no encontrada`);
    }
    return empresa;
  }

  async create(data: CreateEmpresaDto) {

    const empresa = await this.empresaRepo.findOne({ where: { rfc: data.rfc } });
    if (empresa) {
      throw new BadRequestException(`Ya existe una empresa con el RFC ${data.rfc}`);
    }

    const beneficiario = await this.beneficiariosService.findOneRelations(data.beneficiario);
    if (!beneficiario) {
      throw new NotFoundException(`Id de Beneficiario ${data.beneficiario} no encontrado`);
    }

    const representantesLegales = await this.representantesLegalesService.findOne(data.representanteLegal);
    if (!representantesLegales) {
      throw new NotFoundException(`Representante Legal con CURP ${data.representanteLegal} no encontrado`);
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

    const newEmpresa = this.empresaRepo.create(data);
    return this.empresaRepo.save(newEmpresa);
  }


}
