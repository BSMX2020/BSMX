import { Injectable, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { Usuario } from '../entities/usuario.entity';
import { CreateUsuarioDto } from '../dtos/usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
  ) { }

  findAll() {
    return this.usuarioRepo.find();
  }

  async findOne(correo: string) {
    const usuario = await this.usuarioRepo.findOne({ where: { correo } });
    if (!usuario) {
      throw new NotFoundException(`Usuario #${correo} no encontrado`);
    }
    return usuario;
  }

  async create(data: CreateUsuarioDto) {

    const usuario = await this.usuarioRepo.findOne({ where: { correo: data.correo } });
    if (usuario) {
      throw new BadRequestException(`Ya existe un usuario registrado con ese Correo ${data.correo}`);
    }
    
    const { contrasenia } = data;
    const hashedPassword = await this.encryptPassword(contrasenia);    
    data.contrasenia = hashedPassword;

    return this.usuarioRepo.save(data);
    
  }

  async logIn(data: CreateUsuarioDto) {       

    const usuario = await this.usuarioRepo.findOne({
      where: {
        correo: data.correo,        
      }
    });
    
    if (!usuario) {
      throw new NotFoundException(`Correo y/o Contraseña incorrectos`);
    }

    const { contrasenia } = data;         
    const passwordVerificationValue = await this.checkPassword(contrasenia, usuario.contrasenia);        
    
    if (!passwordVerificationValue) {
      throw new NotFoundException(`Correo y/o Contraseña incorrectos`);
    }

    return usuario;
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
