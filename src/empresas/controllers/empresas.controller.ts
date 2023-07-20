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
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateEmpresaDto } from '../../empresas/dto/empresa.dto';
import { EmpresasService } from './../services/empresas.service';

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


}
