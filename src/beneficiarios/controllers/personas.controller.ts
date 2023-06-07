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

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreatePersonaDto } from '../dtos/persona.dto';
import { PersonasService } from './../services/personas.service';

@Controller('personas')
export class PersonasController {

  constructor(private personasService: PersonasService) { }

  @Get()
  findAll() {
    return this.personasService.findAll();
  }

  @Get(':curp')
  get(@Param('curp') curp: string) {
    return this.personasService.findOne(curp);
  }

  @Post()
  create(@Body() payload: CreatePersonaDto) {
    return this.personasService.create(payload);
  }

}
