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

@UseGuards(AuthGuard('jwt'))
@ApiTags('requisitos persona')
@Controller('requisitos-persona')
export class RequisitosPersonaController {
  constructor(private requisitosPersonaService: RequisitosPersonaService) { }

  @Get()
  findAll() {
    return this.requisitosPersonaService.findAll();
  }

  @Get(':curp')
  get(@Param('curp') curp: string) {
    return this.requisitosPersonaService.findOneRelations(curp);
  }

  @Post()
  create(@Body() payload: CreateRequisitosPersonaDto) {
    return this.requisitosPersonaService.create(payload);
  }

}
