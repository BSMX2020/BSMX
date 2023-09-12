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
import { RolesGuard } from '../../auth/guards/roles/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('referencias')
@Controller('referencias')
export class ReferenciasController {

  constructor(private referenciasService: ReferenciasService) { }

  @Roles(Role.PROMOTOR)
  @Get()
  findAll() {
    return this.referenciasService.findAll();
  }

  @Roles(Role.PROMOTOR, Role.BENEFICIARIO)
  @Get(':id')
  get(@Param('id') id: number) {
    return this.referenciasService.findOne(id);
  }

  @Roles(Role.PROMOTOR)
  @Post()
  create(@Body() payload: CreateReferenciaDto) {
    return this.referenciasService.create(payload);
  }

}
