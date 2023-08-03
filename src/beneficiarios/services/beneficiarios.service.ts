import { Injectable, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Beneficiario } from '../entities/beneficiario.entity';
import { CreateBeneficiarioDto, UpdateBeneficiarioDto, LogInBeneficiarioDto } from '../dtos/beneficiario.dto';

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

  async findOneByCorreo(correo: string) {

    const beneficiario = await this.beneficiarioRepo.findOne({ where: { correo } });
    if (!beneficiario) {
      throw new NotFoundException(`Beneficiario #${correo} no encontrado`);
    }
    return beneficiario;
  }

  async logIn(data: LogInBeneficiarioDto) {       

    const beneficiario = await this.beneficiarioRepo.findOne({
      where: {
        correo: data.correo,        
      }
    });
    
    if (!beneficiario) {
      throw new NotFoundException(`Correo y/o Contraseña incorrectos`);
    }

    const { contrasenia } = data;         
    const passwordVerificationValue = await this.checkPassword(contrasenia, beneficiario.contrasenia);        
    
    if (!passwordVerificationValue) {
      throw new NotFoundException(`Correo y/o Contraseña incorrectos`);
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

    const { contrasenia } = data;
    const hashedPassword = await this.encryptPassword(contrasenia);    
    data.contrasenia = hashedPassword;
         
    data.saldo = 0;

    const beneficiario = await this.beneficiarioRepo.findOne({ where: { correo: data.correo } });
    if (beneficiario) {
      throw new BadRequestException(`Ya existe una persona registrada con ese Correo ${data.correo}`);
    }
    
    const domicilio = await this.domiciliosService.findOne(data.domicilio);
    if (!domicilio) { 
      throw new NotFoundException(`Id de Domicilio ${data.domicilio} no encontrado`);
    }

    const newBeneficiario = this.beneficiarioRepo.create(data);    
    return this.beneficiarioRepo.save(newBeneficiario);
  }

  async update(id: number, changes: UpdateBeneficiarioDto) {
    const beneficiario = await this.beneficiarioRepo.findOneBy({id});
    this.beneficiarioRepo.merge(beneficiario, changes);    
    return this.beneficiarioRepo.save(beneficiario);
  }
  
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);    
    return hashedPassword;
  }  

  async checkPassword(password: string, hashPassword: string): Promise<string> {        
    const verificationValue = await bcrypt.compare(password, hashPassword);
    return verificationValue;
  }  

}
