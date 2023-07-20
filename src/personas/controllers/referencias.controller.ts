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

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateReferenciaDto } from '../dtos/referencia.dto';
import { ReferenciasService } from './../services/referencias.service';

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
