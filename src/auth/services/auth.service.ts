import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { BeneficiariosService } from './../../beneficiarios/services/beneficiarios.service';
import { UsuariosService } from './../../usuarios/services/usuarios.service';
import { Beneficiario } from 'src/beneficiarios/entities/beneficiario.entity';
import { PayloadToken } from './../models/token.model'
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {

  constructor(
    private beneficiariosService: BeneficiariosService,
    private usuariosService: UsuariosService,
    private jwtService: JwtService
  ) { }

  async validateBeneficiario(correo: string, contraseniaUser: string) {

    const beneficiario = await this.beneficiariosService.findOneByCorreo(correo);
    if (!beneficiario) {
      return null;
    }  

    const isMatch = await bcrypt.compare(contraseniaUser, beneficiario.contrasenia);
    if (!isMatch) {
      return null;
    }

    const {contrasenia, ...beneficiarioWithoutPassword} = beneficiario;
    return beneficiarioWithoutPassword;
  }

  async validateUsuario(correo: string, contraseniaUser: string) {

    const usuario = await this.usuariosService.findOneByCorreo(correo);
    if (!usuario) {
      return null;
    }  

    const isMatch = await bcrypt.compare(contraseniaUser, usuario.contrasenia);
    if (!isMatch) {
      return null;
    }

    const {contrasenia, ...usuarioWithoutPassword} = usuario;
    return usuarioWithoutPassword;
  }

  generateBeneficiarioJWT(beneficiario: Beneficiario){
    const payload: PayloadToken = { role: "beneficiario", sub: beneficiario.id };
    return {
      access_token: this.jwtService.sign(payload),
      beneficiario,
    }
  }

  generateUsuarioJWT(usuario: Usuario){
    const payload: PayloadToken = { role: "promotor", sub: usuario.id };
    return {
      access_token: this.jwtService.sign(payload),
      usuario,
    }
  }


}
