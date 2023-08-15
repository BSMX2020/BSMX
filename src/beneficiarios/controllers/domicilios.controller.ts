import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateDomicilioDto, UpdateDomicilioDto } from '../dtos/domicilio.dto';
import { DomiciliosService } from './../services/domicilios.service';
import { AuthGuard} from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
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
