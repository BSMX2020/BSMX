import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTransaccionDto, CreateTransaccionCorreoDto } from '../dtos/transaccion.dto';
import { TransaccionesService } from './../services/transacciones.service';
import { AuthGuard} from '@nestjs/passport';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';

@UseGuards(AuthGuard('jwt'))
@ApiTags('transacciones')
@Controller('transaccion')
export class TransaccionesController {
  constructor(private transaccionesService: TransaccionesService) { }

  @Roles(Role.PROMOTOR)
  @Get()
  findAll() {
    return this.transaccionesService.findAll();
  }

  @Roles(Role.BENEFICIARIO, Role.PROMOTOR)
  @Get(':id')
  get(@Param('id') id: number) {
    return this.transaccionesService.findOneRelations(id);
  }

  @Roles(Role.BENEFICIARIO, Role.PROMOTOR)
  @Get('correo/:correo')
  getByCorreo(@Param('correo') correo: string) {
    return this.transaccionesService.findByCorreo(correo);
  }

  @Roles(Role.BENEFICIARIO)
  @Post()
  create(@Body() payload: CreateTransaccionDto) {
    return this.transaccionesService.create(payload);
  }

  @Roles(Role.BENEFICIARIO)
  @Post('/registrocorreo')
  createByCorreo(@Body() payload: CreateTransaccionCorreoDto) {
    return this.transaccionesService.createTransaccionByCorreo(payload);
  }

}
