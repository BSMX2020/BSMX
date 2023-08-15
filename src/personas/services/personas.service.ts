import { 
  Injectable,
  NotFoundException, 
  BadRequestException, 
  HttpException, 
  HttpStatus, 
  forwardRef, 
  Inject 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from '../entities/persona.entity';

import { CreatePersonaDto } from '../dtos/persona.dto';
import { CreatePersonaDatosDto } from '../dtos/personaDatos.dto';

import { BeneficiariosService } from '../../beneficiarios/services/beneficiarios.service';
import { DomiciliosService } from '../../beneficiarios/services/domicilios.service';
import { ReferenciasService } from './referencias.service';
import { CreateBeneficiarioDto} from '../../beneficiarios/dtos/beneficiario.dto';

@Injectable()
export class PersonasService {

  constructor(
    @InjectRepository(Persona) private personaRepo: Repository<Persona>,    
    private beneficiariosService: BeneficiariosService,
    private domiciliosService: DomiciliosService,
    @Inject(forwardRef(() => ReferenciasService))
    private referenciasService: ReferenciasService,
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
      await this.removePersonaDatos(data.beneficiario);
      throw new BadRequestException(`Ya existe una persona registrada con el CURP ${data.curp}`);
    }

    const beneficiario = await this.beneficiariosService.findOneRelations(data.beneficiario);
    if (!beneficiario) {
      await this.removePersonaDatos(data.beneficiario);
      throw new NotFoundException(`Id de Beneficiario ${data.beneficiario} no encontrado`);
    }

    if (beneficiario.persona) {
      await this.removePersonaDatos(data.beneficiario);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Ya existe una persona con el idBeneficiario = ${data.beneficiario} asignado`,
      }, HttpStatus.BAD_REQUEST);
    }

    if (beneficiario.empresa) {
      await this.removePersonaDatos(data.beneficiario);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Ya existe una empresa con el idBeneficiario = ${data.beneficiario} asignado`,
      }, HttpStatus.BAD_REQUEST);
    }

    const newPersona = this.personaRepo.create(data);
    return this.personaRepo.save(newPersona);
  }

  async registerPersona(data: CreatePersonaDatosDto) {

    // ----------------------------- Registro Domicilio

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
      await this.domiciliosService.remove(domicilio.id);
      throw new BadRequestException(respuestaBeneficiario.mensaje);
    }    

    // ----------------------------- Registro Persona

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
      beneficiario: respuestaBeneficiario.beneficiario
    };

    const persona = await this.create(personaObject);    

    // ----------------------------- Registro Referencias    

    const respuestaPrimerReferencia = await this.registerReferencia(
      data.nombrePrimerReferencia,
      data.telefonoPrimerReferencia,
      persona.curp
    );          
   
    const respuestaSegundaReferencia = await this.registerReferencia(
      data.nombreSegundaReferencia,
      data.telefonoSegundaReferencia,
      persona.curp
    );     

    if (!respuestaPrimerReferencia.resultado || !respuestaSegundaReferencia.resultado) {                  
      await this.removeReferenciasPersonaDatos(domicilio.id, respuestaBeneficiario.beneficiario, persona.curp);
      if(!respuestaPrimerReferencia.resultado) {
        throw new BadRequestException(respuestaPrimerReferencia.mensaje);
      } else {
        throw new BadRequestException(respuestaSegundaReferencia.mensaje);
      }      
    }   

    return persona;
  }

  async removePersonaDatos(beneficiarioId: number) {

    const beneficiario = await this.beneficiariosService.findOneRelations(beneficiarioId);      
    await this.domiciliosService.remove(beneficiario.domicilio);
    await this.beneficiariosService.remove(beneficiarioId);    
  } 

  remove(curp: string) {
    return this.personaRepo.delete(curp);
  }

  async registerReferencia(nombre: string, telefono: string, curp: string) {

    var referenciaObject = {
      nombre: nombre,
      telefono: telefono,      
      persona: curp
    };

    const respuestaReferencia =
      await this.referenciasService.createReferenciaPersonaDatos(referenciaObject);    
    return respuestaReferencia;
  }

  async removeReferenciasPersonaDatos(domicilioId: number, beneficiarioId: number, personaId: string) {
    await this.domiciliosService.remove(domicilioId);
    await this.beneficiariosService.remove(beneficiarioId);
    await this.remove(personaId);
  }  

}
