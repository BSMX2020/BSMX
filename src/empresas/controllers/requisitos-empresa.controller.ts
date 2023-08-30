import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateRequisitosEmpresaDto } from '../dto/requisitosEmpresa.dto';
import { RequisitosEmpresaService } from './../services/requisitos-empresa.service';
import { AuthGuard} from '@nestjs/passport'
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';
import { RolesGuard } from '../../auth/guards/roles/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('requisitos empresa')
@Controller('requisitos-empresa')
export class RequisitosEmpresaController {
  constructor(private requisitosEmpresaService: RequisitosEmpresaService) { }

  @Roles(Role.PROMOTOR)
  @Get()
  findAll() {
    return this.requisitosEmpresaService.findAll();
  }

  @Roles(Role.PROMOTOR, Role.BENEFICIARIO)
  @Get(':empresaRfc')
  get(@Param('empresaRfc') empresaRfc: string) {
    return this.requisitosEmpresaService.findOneRelations(empresaRfc);
  }

  @Roles(Role.PROMOTOR)
  @Post()
  create(@Body() payload: CreateRequisitosEmpresaDto) {
    return this.requisitosEmpresaService.create(payload);
  }

}
