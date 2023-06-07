import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { Usuario } from '../entities/usuario.entity';
import { CreateUsuarioDto } from '../dtos/usuario.dto';

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
      throw new NotFoundException(`Usuario #${correo} not found`);
    }
    return usuario;
  }

  create(data: CreateUsuarioDto) {
    const newUsuario = this.usuarioRepo.create(data);
    return this.usuarioRepo.save(newUsuario);
  }



}
