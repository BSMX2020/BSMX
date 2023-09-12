import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateRequisitosPersonaDto } from '../dtos/requisitosPersona.dto';
import { RequisitosPersonaService } from './../services/requisitos-persona.service';
import { AuthGuard} from '@nestjs/passport'
import { RolesGuard } from '../../auth/guards/roles/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('requisitos persona')
@Controller('requisitos-persona')
export class RequisitosPersonaController {
  constructor(private requisitosPersonaService: RequisitosPersonaService) { }

  @Roles(Role.PROMOTOR)
  @Get()
  findAll() {
    return this.requisitosPersonaService.findAll();
  }

  @Roles(Role.PROMOTOR, Role.BENEFICIARIO)
  @Get(':curp')
  get(@Param('curp') curp: string) {
    return this.requisitosPersonaService.findOneRelations(curp);
  }

  @Roles(Role.PROMOTOR)
  @Post()
  create(@Body() payload: CreateRequisitosPersonaDto) {
    return this.requisitosPersonaService.create(payload);
  }

}
