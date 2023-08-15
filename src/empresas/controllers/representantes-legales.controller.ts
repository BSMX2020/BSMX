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
import { AuthGuard} from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@ApiTags('representantes-legales')
@Controller('representantes-legales')
export class RepresentantesLegalesController {

  constructor(private representanteLegalService: RepresentantesLegalesService) { }

  @Get()
  findAll() {
    return this.representanteLegalService.findAll();
  }

  @Get(':curp')
  get(@Param('curp') curp: string) {
    return this.representanteLegalService.findOne(curp);
  }

  @Post()
  create(@Body() payload: CreateRepresentanteLegalDto) {
    return this.representanteLegalService.create(payload);
  }

}
