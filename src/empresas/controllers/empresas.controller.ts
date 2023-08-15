import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateEmpresaDto } from '../../empresas/dto/empresa.dto';
import { CreateEmpresaDatosDto } from '../../empresas/dto/empresaDatos.dto';
import { EmpresasService } from './../services/empresas.service';
import { AuthGuard} from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@ApiTags('empresas')
@Controller('empresas')
export class EmpresasController {

  constructor(private empresasService: EmpresasService) { }

  @Get()
  findAll() {
    return this.empresasService.findAll();
  }

  @Get(':rfc')
  get(@Param('rfc') rfc: string) {
    return this.empresasService.findOne(rfc);
  }

  @Post()
  create(@Body() payload: CreateEmpresaDto) {
    return this.empresasService.create(payload);
  }

  @Post('/empresaDatos')
  createPersonaDatos(@Body() payload: CreateEmpresaDatosDto) {
    return this.empresasService.registerEmpresa(payload);
  }


}
