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

import { CreatePersonaDto } from '../../personas/dtos/persona.dto';
import { CreatePersonaDatosDto } from '../../personas/dtos/personaDatos.dto';
import { PersonasService } from '../../personas/services/personas.service';

@ApiTags('personas')
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

  @Post('/personasDatos')
  createPersonaDatos(@Body() payload: CreatePersonaDatosDto) {
    return this.personasService.registerPersona(payload);
  }

}
