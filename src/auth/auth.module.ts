import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {ConfigType} from '@nestjs/config'

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsuariosLocalStrategy } from './strategies/usuariosLocal.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BeneficiariosModule } from './../beneficiarios/beneficiarios.module'
import { UsuariosModule } from './../usuarios/usuarios.module'
import { AuthController } from './controllers/auth.controller';
import config from './../config'

@Module({
  imports: [
    BeneficiariosModule,
    UsuariosModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {            
            expiresIn: '2d',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, UsuariosLocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
