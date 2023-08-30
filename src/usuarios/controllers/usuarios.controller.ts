import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../../auth/decorators/public.decorator'
import { CreateUsuarioDto } from '../dtos/usuario.dto';
import { UsuariosService } from './../services/usuarios.service';
import { AuthGuard} from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {

  constructor(private usuariosService: UsuariosService) { }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':correo')
  get(@Param('correo') correo: string) {
    return this.usuariosService.findOne(correo);
  } 

  @Post()
  create(@Body() payload: CreateUsuarioDto) {
    return this.usuariosService.create(payload);
  }

  @Public()
  @Post('login')
  logIn(@Body() payload: CreateUsuarioDto) {
    return this.usuariosService.logIn(payload);
  }

}
