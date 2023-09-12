import {
  Controller,
  Get,  
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreatePersonaDto } from '../../personas/dtos/persona.dto';
import { CreatePersonaDatosDto } from '../../personas/dtos/personaDatos.dto';
import { PersonasService } from '../../personas/services/personas.service';
import { AuthGuard} from '@nestjs/passport'
import { RolesGuard } from '../../auth/guards/roles/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('personas')
@Controller('personas')
export class PersonasController {

  constructor(private personasService: PersonasService) { }

  @Roles(Role.PROMOTOR)
  @Get()
  findAll() {
    return this.personasService.findAll();
  }

  @Roles(Role.PROMOTOR)
  @Get(':curp')
  get(@Param('curp') curp: string) {
    return this.personasService.findOne(curp);
  }

  @Roles(Role.PROMOTOR)
  @Post()
  create(@Body() payload: CreatePersonaDto) {
    return this.personasService.create(payload);
  }

  @Roles(Role.PROMOTOR)
  @Post('/personasDatos')
  createPersonaDatos(@Body() payload: CreatePersonaDatosDto) {
    return this.personasService.registerPersona(payload);
  }

}
