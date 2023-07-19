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
import { CreateLineaCreditoDto } from '../dtos/lineaCredito.dto';
import { LineasCreditoService } from './../services/lineas-credito.service';

@ApiTags('lineas de credito')
@Controller('lineas-credito')
export class LineasCreditoController {

  constructor(private lineasCreditoService: LineasCreditoService) { }

  @Get()
  findAll() {
    return this.lineasCreditoService.findAll();
  }

  @Get(':folio')
  get(@Param('folio') folio: string) {
    return this.lineasCreditoService.findOne(folio);
  }

  @Post()
  create(@Body() payload: CreateLineaCreditoDto) {
    return this.lineasCreditoService.create(payload);
  }
}
