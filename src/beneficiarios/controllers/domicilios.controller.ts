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
import { CreateDomicilioDto, UpdateDomicilioDto } from '../dtos/domicilio.dto';
import { DomiciliosService } from './../services/domicilios.service';

@ApiTags('domicilios')
@Controller('domicilios')
export class DomiciliosController {

  constructor(private domiciliosService: DomiciliosService) { }

  @Get()
  findAll() {
    return this.domiciliosService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.domiciliosService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateDomicilioDto) {
    return this.domiciliosService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDomicilioDto,
  ) {
    return this.domiciliosService.update(id, payload);
  }
}
