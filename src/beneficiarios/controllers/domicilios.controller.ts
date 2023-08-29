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
import { AuthGuard} from '@nestjs/passport';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';

@UseGuards(AuthGuard('jwt'))
@ApiTags('domicilios')
@Controller('domicilios')
export class DomiciliosController {

  constructor(private domiciliosService: DomiciliosService) { }

  @Roles(Role.PROMOTOR)
  @Get()
  findAll() {
    return this.domiciliosService.findAll();
  }

  @Roles(Role.BENEFICIARIO, Role.PROMOTOR)
  @Get(':id')
  get(@Param('id') id: number) {
    return this.domiciliosService.findOne(id);
  }

  @Roles(Role.PROMOTOR)
  @Post()
  create(@Body() payload: CreateDomicilioDto) {
    return this.domiciliosService.create(payload);
  }

  @Roles(Role.BENEFICIARIO, Role.PROMOTOR)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDomicilioDto,
  ) {
    return this.domiciliosService.update(id, payload);
  }
}
