import { Injectable, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaccion } from '../entities/transaccion.entity';
import { CreateTransaccionDto, CreateTransaccionCorreoDto } from '../dtos/transaccion.dto';

import { BeneficiariosService } from './beneficiarios.service';
import { UpdateBeneficiarioDto } from '../dtos/beneficiario.dto';


@Injectable()
export class TransaccionesService {

  constructor(
    @InjectRepository(Transaccion) private transaccionRepo: Repository<Transaccion>,
    private beneficiarioService: BeneficiariosService,
  ) { }

  findAll() {
    return this.transaccionRepo.find({
      relations: ['beneficiarioEmisor', 'beneficiarioReceptor'],
    });
  }

  async findOne(id: number) {
    const transaccion = await this.transaccionRepo.findOne({ where: { id } });
    if (!transaccion) {
      throw new NotFoundException(`Transaccion #${id} no encontrada`);
    }
    return transaccion;
  }

  async findOneRelations(id: number) {
    const transaccion = await this.transaccionRepo.findOne({ 
      where: { id },
      relations: ['beneficiarioEmisor', 'beneficiarioReceptor'],   
    });
    if (!transaccion) {
      throw new NotFoundException(`Transaccion #${id} no encontrada`);
    }
    return transaccion;
  }

  async create(data: CreateTransaccionDto) {    
    
    const beneficiarioEmisor = await this.beneficiarioService.findOne(data.beneficiarioEmisor);
    if (!beneficiarioEmisor) { 
      throw new NotFoundException(`Beneficiario Emisor ${data.beneficiarioEmisor} no encontrado`);
    }

    const beneficiarioReceptor = await this.beneficiarioService.findOne(data.beneficiarioReceptor);
    if (!beneficiarioReceptor) { 
      throw new NotFoundException(`Beneficiario Receptor ${data.beneficiarioReceptor} no encontrado`);
    }

    if (beneficiarioEmisor.saldo < data.monto) {
      throw new BadRequestException(`El beneficiario emisor no tiene saldo suficiente`);
    }

    beneficiarioEmisor.saldo = beneficiarioEmisor.saldo - data.monto;
    beneficiarioReceptor.saldo = beneficiarioReceptor.saldo + data.monto;

    const newTransaccion = this.transaccionRepo.create(data);    
    const transaccion = this.transaccionRepo.save(newTransaccion);

    if (!transaccion) {
      throw new BadRequestException(`No se pudo realizar la transaccion`);
    }

    await this.beneficiarioService.update(beneficiarioEmisor.id, beneficiarioEmisor);
    await this.beneficiarioService.update(beneficiarioReceptor.id, beneficiarioReceptor);

    return transaccion;
  }

  // async createTransaccionByCorreo(data: CreateTransaccionCorreoDto) {    
    
  //   const beneficiarioEmisor = await this.beneficiarioService.findOneByCorreo(data.correoBeneficiarioEmisor);
  //   if (!beneficiarioEmisor) { 
  //     throw new NotFoundException(`Beneficiario Emisor ${data.correoBeneficiarioEmisor} no encontrado`);
  //   }

  //   const beneficiarioReceptor = await this.beneficiarioService.findOneByCorreo(data.correoBeneficiarioReceptor);
  //   if (!beneficiarioReceptor) { 
  //     throw new NotFoundException(`Beneficiario Receptor ${data.correoBeneficiarioReceptor} no encontrado`);
  //   }

  //   if (beneficiarioEmisor.saldo < data.monto) {
  //     throw new BadRequestException(`El beneficiario emisor no tiene saldo suficiente`);
  //   }

  //   beneficiarioEmisor.saldo = beneficiarioEmisor.saldo - data.monto;
  //   beneficiarioReceptor.saldo = beneficiarioReceptor.saldo + data.monto;

  //   var dataTransaccion = {
  //     monto: data.monto,
  //     descripcion: data.descripcion,
  //     beneficiarioEmisor: beneficiarioEmisor.id,
  //     beneficiarioReceptor: beneficiarioReceptor.id,
  //   }        

  //   const newTransaccion = this.transaccionRepo.create(dataTransaccion);    
  //   const transaccion = this.transaccionRepo.save(newTransaccion);

  //   if (!transaccion) {
  //     throw new BadRequestException(`No se pudo realizar la transaccion`);
  //   }

  //   await this.beneficiarioService.update(beneficiarioEmisor.id, beneficiarioEmisor);
  //   await this.beneficiarioService.update(beneficiarioReceptor.id, beneficiarioReceptor);

  //   return transaccion;
  // }

  async createTransaccionByCorreo(data: CreateTransaccionCorreoDto) {    
    
    const beneficiarioEmisor = await this.beneficiarioService.findOneByCorreo(data.correoBeneficiarioEmisor);
    if (!beneficiarioEmisor) { 
      throw new NotFoundException(`Beneficiario Emisor ${data.correoBeneficiarioEmisor} no encontrado`);
    }

    const beneficiarioReceptor = await this.beneficiarioService.findOneByCorreo(data.correoBeneficiarioReceptor);
    if (!beneficiarioReceptor) { 
      throw new NotFoundException(`Beneficiario Receptor ${data.correoBeneficiarioReceptor} no encontrado`);
    }    

    var dataTransaccion = {
      monto: data.monto,
      descripcion: data.descripcion,
      beneficiarioEmisor: beneficiarioEmisor.id,
      beneficiarioReceptor: beneficiarioReceptor.id,
    }        

    return await this.create(dataTransaccion);
  }

}
