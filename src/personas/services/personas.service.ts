import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from '../entities/persona.entity';

import { CreatePersonaDto } from '../dtos/persona.dto';
import { CreatePersonaDatosDto } from '../dtos/personaDatos.dto';

import { BeneficiariosService } from '../../beneficiarios/services/beneficiarios.service';
import { DomiciliosService } from '../../beneficiarios/services/domicilios.service';
import { CreateBeneficiarioDto} from '../../beneficiarios/dtos/beneficiario.dto';

@Injectable()
export class PersonasService {

  constructor(
    @InjectRepository(Persona) private personaRepo: Repository<Persona>,    
    private beneficiariosService: BeneficiariosService,
    private domiciliosService: DomiciliosService,
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

    const persona = await this.personaRepo.findOne({ where: { curp: data.curp } });
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

  async registerPersona(data: CreatePersonaDatosDto) {

    var domicilioObject = {
      calle: data.calle,
      colonia: data.colonia,
      estado: data.estadoOrigen,
      municipio: data.municipioOrigen,
      localidad: data.localidadOrigen,
      codigoPostal: data.codigoPostal,
      numeroExterior: data.numeroExterior,
      numeroInterior: data.numeroInterior
    }

    const domicilio = await this.domiciliosService.create(domicilioObject);
    if (!domicilio) {
      throw new BadRequestException(`Error de registro`);
    }

    var beneficiarioObject = {
      nombre: data.nombre,
      correo: data.correo,
      contrasenia: data.contrasenia,
      foto: null,
      saldo: null,
      domicilio: (await domicilio).id
    };
    
    const beneficiario = this.beneficiariosService.create(beneficiarioObject);
    if (!beneficiario) {
      await this.domiciliosService.remove(domicilio.id);
      throw new BadRequestException(`Error de registro`);
    }

    var personaObject = {
      curp: data.curp,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      telefono: data.telefono,
      estado: data.estado,
      municipio: data.municipio,
      fechaNacimiento: data.fechaNacimiento,
      ocupacion: data.ocupacion,
      localidad: data.localidad,
      percepcionMensual: data.percepcionMensual,
      beneficiario: (await beneficiario).id
    };

    const persona = this.create(personaObject);
    if (!persona) {
      await this.domiciliosService.remove((await domicilio).id);
      await this.beneficiariosService.remove((await beneficiario).id);
      throw new BadRequestException(`Error de registro`);
    }

    return persona;

  }

}
