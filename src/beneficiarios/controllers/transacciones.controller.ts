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

import { CreateTransaccionDto, CreateTransaccionCorreoDto } from '../dtos/transaccion.dto';
import { TransaccionesService } from './../services/transacciones.service';

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

  @Post()
  create(@Body() payload: CreateTransaccionDto) {
    return this.transaccionesService.create(payload);
  }

  @Post('/registrocorreo')
  createByCorreo(@Body() payload: CreateTransaccionCorreoDto) {
    return this.transaccionesService.createTransaccionByCorreo(payload);
  }

}
