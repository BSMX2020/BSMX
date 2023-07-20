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

import { CreateRequisitosEmpresaDto } from '../dto/requisitosEmpresa.dto';
import { RequisitosEmpresaService } from './../services/requisitos-empresa.service';

@ApiTags('requisitos empresa')
@Controller('requisitos-empresa')
export class RequisitosEmpresaController {
  constructor(private requisitosEmpresaService: RequisitosEmpresaService) { }

  @Get()
  findAll() {
    return this.requisitosEmpresaService.findAll();
  }

  @Get(':empresaRfc')
  get(@Param('empresaRfc') empresaRfc: string) {
    return this.requisitosEmpresaService.findOneRelations(empresaRfc);
  }

  @Post()
  create(@Body() payload: CreateRequisitosEmpresaDto) {
    return this.requisitosEmpresaService.create(payload);
  }

}
