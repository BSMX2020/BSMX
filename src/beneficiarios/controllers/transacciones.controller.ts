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
import { AuthGuard} from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@ApiTags('transacciones')
@Controller('transaccion')
export class TransaccionesController {
  constructor(private transaccionesService: TransaccionesService) { }

  @Get()
  findAll() {
    return this.transaccionesService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.transaccionesService.findOneRelations(id);
  }

  @Get('correo/:correo')
  getByCorreo(@Param('correo') correo: string) {
    return this.transaccionesService.findByCorreo(correo);
  }

  @Post()
  create(@Body() payload: CreateTransaccionDto) {
    return this.transaccionesService.create(payload);
  }

  @Post('/registrocorreo')
  createByCorreo(@Body() payload: CreateTransaccionCorreoDto) {
    return this.transaccionesService.createTransaccionByCorreo(payload);
  }

}
