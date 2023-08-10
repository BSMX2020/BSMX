import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Referencia } from '../entities/referencia.entity';
import { CreateReferenciaDto } from '../dtos/referencia.dto';

import { PersonasService } from './personas.service';

@Injectable()
export class ReferenciasService {

  constructor(
    @InjectRepository(Referencia) private referenciaRepo: Repository<Referencia>,    
    @Inject(forwardRef(() => PersonasService))
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

  async createReferenciaPersonaDatos(data: CreateReferenciaDto) {    

    var respuesta = {
      mensaje: "Referencia registrado con éxito",
      resultado: true,      
    }

    const persona = await this.personasService.findOne(data.persona);

    if (!persona) {            
      respuesta.mensaje = `CURP de Persona ${data.persona} no encontrada`;
      respuesta.resultado = false;
      return respuesta;
    }

    const newReferencia = this.referenciaRepo.create(data);
    await this.referenciaRepo.save(newReferencia);
    return respuesta;
  }

}
