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
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';
import { AuthGuard} from '@nestjs/passport'
import { RolesGuard } from '../../auth/guards/roles/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('empresas')
@Controller('empresas')
export class EmpresasController {

  constructor(private empresasService: EmpresasService) { }

  @Roles(Role.PROMOTOR)
  @Get()
  findAll() {
    return this.empresasService.findAll();
  }

  @Roles(Role.PROMOTOR, Role.BENEFICIARIO)
  @Get(':rfc')
  get(@Param('rfc') rfc: string) {
    return this.empresasService.findOne(rfc);
  }

  @Roles(Role.PROMOTOR)
  @Post()
  create(@Body() payload: CreateEmpresaDto) {
    return this.empresasService.create(payload);
  }

  @Roles(Role.PROMOTOR)
  @Post('/empresaDatos')
  createPersonaDatos(@Body() payload: CreateEmpresaDatosDto) {
    return this.empresasService.registerEmpresa(payload);
  }


}
