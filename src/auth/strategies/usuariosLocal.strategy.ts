import { 
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { AuthService } from './../../auth/services/auth.service';

@Injectable()
export class UsuariosLocalStrategy extends PassportStrategy(Strategy, 'usuariosLocal'){
  constructor(private authService: AuthService){
    super({
      usernameField: 'correo',
      passwordField: 'contrasenia',
    });
  }

  async validate(correo: string, contrasenia: string) {
    const usuario = await this.authService.validateUsuario(correo, contrasenia);
    if(!usuario){
      throw new UnauthorizedException('Correo y/o Contraseña incorrectas');
    }
    
    return usuario;
  }
}