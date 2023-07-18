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

import { CreateRequisitosPersonaDto } from '../dtos/requisitosPersona.dto';
import { RequisitosPersonaService } from './../services/requisitos-persona.service';

@ApiTags('requisitosPersona')
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
