import { Injectable, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaccion } from '../entities/transaccion.entity';
import { CreateTransaccionDto, CreateTransaccionCorreoDto } from '../dtos/transaccion.dto';

import { BeneficiariosService } from './beneficiarios.service';
import { UpdateBeneficiarioDto } from '../dtos/beneficiario.dto';
import { DateTime } from 'luxon';



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
    const transaccion = await this.transaccionRepo.findOne({
      where: { id },
      relations: ['beneficiarioEmisor', 'beneficiarioReceptor'],
    });
    if (!transaccion) {
      throw new NotFoundException(`Transaccion #${id} no encontrada`);
    }
    return transaccion;
  }

  async findByCorreo(correo: string) {

    const beneficiario = await this.beneficiarioService.findOneByCorreo(correo); 
    var beneficiarioEmisorId = beneficiario.id; 
    var beneficiarioReceptorId = beneficiario.id;

    const transacciones = await this.transaccionRepo
                        .createQueryBuilder('transaccion')
                        .leftJoinAndSelect('transaccion.beneficiarioEmisor', 'beneficiarioEmisor')                        
                        .leftJoinAndSelect('transaccion.beneficiarioReceptor', 'beneficiarioReceptor')
                        .where('beneficiarioEmisor.id = :beneficiarioEmisorId', { beneficiarioEmisorId }) // Aplicando el filtro WHERE en la relación user
                        .orWhere('beneficiarioReceptor.id = :beneficiarioReceptorId', { beneficiarioReceptorId })
                        .getMany();
  

    return transacciones;    
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
      fecha: DateTime.now().setZone('America/Mexico_City')
    }        

    return await this.create(dataTransaccion);
  }

}
