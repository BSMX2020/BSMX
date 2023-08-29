import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateLineaCreditoDto } from '../dtos/lineaCredito.dto';
import { LineasCreditoService } from './../services/lineas-credito.service';
import { AuthGuard} from '@nestjs/passport';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';

@UseGuards(AuthGuard('jwt'))
@ApiTags('lineas de credito')
@Controller('lineas-credito')
export class LineasCreditoController {

  constructor(private lineasCreditoService: LineasCreditoService) { }

  @Roles(Role.PROMOTOR)
  @Get()
  findAll() {
    return this.lineasCreditoService.findAll();
  }

  @Roles(Role.BENEFICIARIO, Role.PROMOTOR)
  @Get(':folio')
  get(@Param('folio') folio: string) {
    return this.lineasCreditoService.findOne(folio);
  }

  @Roles(Role.PROMOTOR)
  @Post()
  create(@Body() payload: CreateLineaCreditoDto) {
    return this.lineasCreditoService.create(payload);
  }
}
