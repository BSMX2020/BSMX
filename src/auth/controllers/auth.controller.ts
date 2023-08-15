import { 
  Controller,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';

import { Request} from 'express'
import { AuthGuard} from '@nestjs/passport'

import { AuthService} from './../services/auth.service'
import { Beneficiario } from 'src/beneficiarios/entities/beneficiario.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('beneficiarios/login')
  loginBeneficiarios(@Req() req: Request) {
    const beneficiario = req.user as Beneficiario;
    return this.authService.generateBeneficiarioJWT(beneficiario);
  }

  @UseGuards(AuthGuard('usuariosLocal'))
  @Post('usuarios/login')
  loginUsuarios(@Req() req: Request) {
    const usuario = req.user as Usuario;
    return this.authService.generateUsuarioJWT(usuario);
  }
}
