import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Beneficiario } from '../entities/beneficiario.entity';
import { CreateBeneficiarioDto } from '../dtos/beneficiario.dto';

import { DomiciliosService } from './domicilios.service';

@Injectable()
export class BeneficiariosService {

  constructor(
    @InjectRepository(Beneficiario) private beneficiarioRepo: Repository<Beneficiario>,
    private domiciliosService: DomiciliosService,
  ) { }

  findAll() {
    return this.beneficiarioRepo.find({
      relations: [
        'domicilio', 
        'persona', 
        'empresa', 
        'transaccionesEmisor', 
        'transaccionesReceptor',
        'lineaCredito'], 
    });
  }

  async findOne(id: number) {
    const beneficiario = await this.beneficiarioRepo.findOne({ where: { id } });
    if (!beneficiario) {
      throw new NotFoundException(`Beneficiario #${id} no encontrado`);
    }
    return beneficiario;
  }

  async findOneRelations(id: number) {
    const beneficiario = await this.beneficiarioRepo.findOne({ 
      where: { id },
      relations: [
        'domicilio', 
        'persona', 
        'empresa', 
        'transaccionesEmisor', 
        'transaccionesReceptor',
        'lineaCredito'],   
    });
    if (!beneficiario) {
      throw new NotFoundException(`Beneficiario #${id} no encontrado`);
    }
    return beneficiario;
  }

  async create(data: CreateBeneficiarioDto) {
    
    const domicilio = await this.domiciliosService.findOne(data.domicilio);
    if (!domicilio) { 
      throw new NotFoundException(`Id de Domicilio ${data.domicilio} no encontrado`);
    }

    const newBeneficiario = this.beneficiarioRepo.create(data);    
    return this.beneficiarioRepo.save(newBeneficiario);
  }

}
