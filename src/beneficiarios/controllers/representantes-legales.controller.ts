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

import { CreateRepresentanteLegalDto } from '../dtos/representante-legal.dto';
import { RepresentantesLegalesService } from './../services/representantes-legales.service';

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
