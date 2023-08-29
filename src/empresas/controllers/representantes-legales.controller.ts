import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateRepresentanteLegalDto } from './../dto/representante-legal.dto';
import { RepresentantesLegalesService } from './../services/representantes-legales.service';
import { AuthGuard} from '@nestjs/passport';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';

@UseGuards(AuthGuard('jwt'))
@ApiTags('representantes-legales')
@Controller('representantes-legales')
export class RepresentantesLegalesController {

  constructor(private representanteLegalService: RepresentantesLegalesService) { }

  @Roles(Role.PROMOTOR)
  @Get()
  findAll() {
    return this.representanteLegalService.findAll();
  }

  @Roles(Role.PROMOTOR, Role.BENEFICIARIO)
  @Get(':curp')
  get(@Param('curp') curp: string) {
    return this.representanteLegalService.findOne(curp);
  }

  @Roles(Role.PROMOTOR)
  @Post()
  create(@Body() payload: CreateRepresentanteLegalDto) {
    return this.representanteLegalService.create(payload);
  }

}
