import { 
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { AuthService } from './../../auth/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local'){
  constructor(private authService: AuthService){
    super({
      usernameField: 'correo',
      passwordField: 'contrasenia',
    });
  }

  async validate(correo: string, contrasenia: string) {
    const beneficiario = await this.authService.validateBeneficiario(correo, contrasenia);
    if(!beneficiario){
      throw new UnauthorizedException('Correo y/o Contraseña incorrectas');
    }
    
    return beneficiario;
  }
}