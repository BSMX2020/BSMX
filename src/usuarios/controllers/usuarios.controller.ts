import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,  
  // ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe, } from '../../common/parse-int.pipe';
import { CreateUsuarioDto } from '../dtos/usuario.dto';
import { UsuariosService } from './../services/usuarios.service';

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

  @Post('login')
  logIn(@Body() payload: CreateUsuarioDto) {
    return this.usuariosService.logIn(payload);
  }

}
