import { Injectable, NotFoundException, Inject, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empresa } from '../../empresas/entities/empresa.entity';
import { CreateEmpresaDto } from '../../empresas/dto/empresa.dto';
import { CreateEmpresaDatosDto } from '../../empresas/dto/empresaDatos.dto';

import { BeneficiariosService } from '../../beneficiarios/services/beneficiarios.service';
import { DomiciliosService } from '../../beneficiarios/services/domicilios.service';
import { RepresentantesLegalesService } from './representantes-legales.service';


@Injectable()
export class EmpresasService {

  constructor(
    @InjectRepository(Empresa) private empresaRepo: Repository<Empresa>,
    private beneficiariosService: BeneficiariosService,
    private representantesLegalesService: RepresentantesLegalesService,
    private domiciliosService: DomiciliosService,
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
      await this.removeData(data);
      throw new BadRequestException(`Ya existe una empresa con el RFC ${data.rfc}`);
    }

    const beneficiario = await this.beneficiariosService.findOneRelations(data.beneficiario);
    if (!beneficiario) {
      await this.removeData(data);
      throw new NotFoundException(`Id de Beneficiario ${data.beneficiario} no encontrado`);
    }

    const representantesLegales = await this.representantesLegalesService.findOne(data.representanteLegal);
    if (!representantesLegales) {
      await this.removeData(data);
      throw new NotFoundException(`Representante Legal con CURP ${data.representanteLegal} no encontrado`);
    }

    if (beneficiario.persona) {
      await this.removeData(data);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Ya existe una persona con el idBeneficiario = ${data.beneficiario} asignado`,
      }, HttpStatus.BAD_REQUEST);
    }

    if (beneficiario.empresa) {
      await this.removeData(data);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Ya existe una empresa con el idBeneficiario = ${data.beneficiario} asignado`,
      }, HttpStatus.BAD_REQUEST);
    }

    const newEmpresa = this.empresaRepo.create(data);
    return this.empresaRepo.save(newEmpresa);
  } 

  async removeData(data: CreateEmpresaDto) {    
    const beneficiario = await this.beneficiariosService.findOneRelations(data.beneficiario);      
    
    await this.domiciliosService.remove(beneficiario.domicilio)
    await this.beneficiariosService.remove(data.beneficiario);
    await this.representantesLegalesService.remove(data.representanteLegal);
  }

  async removeEmpresaDatos(domicilioId = null, curpRepresentanteLegal = null) {
    if (domicilioId !== null) {
      await this.domiciliosService.remove(domicilioId);
    }
  
    if (curpRepresentanteLegal !== null) {
      await this.representantesLegalesService.remove(curpRepresentanteLegal);
    }
  }

  async registerEmpresa(data: CreateEmpresaDatosDto) {

    // ----------------------------- Registro Domicilio

    var domicilioObject = {
      calle: data.calle,
      colonia: data.colonia,
      estado: data.estado,
      municipio: data.municipio,
      localidad: data.localidad,
      codigoPostal: data.codigoPostal,
      numeroExterior: data.numeroExterior,
      numeroInterior: data.numeroInterior
    }

    const domicilio = await this.domiciliosService.create(domicilioObject);

    // ----------------------------- Registro RepresentanteLegal

    var representanteLegalObject = {
      curp: data.curpRepresentanteLegal,
      apellidoPaterno: data.apellidoPaternoRepresentanteLegal,
      apellidoMaterno: data.apellidoMaternoRepresentanteLegal,
      nombre: data.nombreRepresentanteLegal,
      fechaNacimiento: data.fechaNacimientoRepresentanteLegal,
      telefono: data.telefonoRepresentanteLegal,
      tipoAcreditacion: data.tipoAcreditacionRepresentanteLegal,      
    };

    const representanteLegal = await this.representantesLegalesService.createEmpresaDatos(representanteLegalObject);    
    if (!representanteLegal) {
      await this.removeEmpresaDatos(domicilio.id)
      throw new BadRequestException(`Ya existe un representante legal con el CURP ${data.curpRepresentanteLegal}`);
    }

    // ----------------------------- Registro Beneficiario

    var beneficiarioObject = {
      nombre: data.nombre,
      correo: data.correo,
      contrasenia: data.contrasenia,
      foto: null,
      saldo: null,
      domicilio: domicilio.id
    };
    
    const respuestaBeneficiario = await this.beneficiariosService.createBeneficiarioDatos(beneficiarioObject);    
    if (!respuestaBeneficiario.resultado) {      
      await this.removeEmpresaDatos(domicilio.id, data.curpRepresentanteLegal)
      throw new BadRequestException(respuestaBeneficiario.mensaje);
    }    

    // ----------------------------- Registro Empresa

    var empresaObject = {
      rfc: data.rfc,
      ingresoMensual: data.ingresoMensual,
      antiguedad: data.antiguedad,
      tipoGiro: data.tipoGiro,
      gasto: data.gasto,
      utilidad: data.utilidad,
      empresaTipo: data.empresaTipo,      
      beneficiario: respuestaBeneficiario.beneficiario,
      representanteLegal: representanteLegal.curp
    };

    const empresa = this.create(empresaObject);

    return empresa;

  }


}
