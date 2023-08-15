import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateReferenciaDto } from '../dtos/referencia.dto';
import { ReferenciasService } from './../services/referencias.service';
import { AuthGuard} from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@ApiTags('referencias')
@Controller('referencias')
export class ReferenciasController {

  constructor(private referenciasService: ReferenciasService) { }

  @Get()
  findAll() {
    return this.referenciasService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.referenciasService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateReferenciaDto) {
    return this.referenciasService.create(payload);
  }

}
