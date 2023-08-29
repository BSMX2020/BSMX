import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateBeneficiarioDto, UpdateBeneficiarioDto, LogInBeneficiarioDto } from '../dtos/beneficiario.dto';
import { BeneficiariosService } from './../services/beneficiarios.service';
import { Public } from '../../auth/decorators/public.decorator';
import { AuthGuard} from '@nestjs/passport';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';

@UseGuards(AuthGuard('jwt'))
@ApiTags('beneficiarios')
@Controller('beneficiarios')
export class BeneficiariosController {

  constructor(private beneficiariosService: BeneficiariosService) { }

  @Roles(Role.PROMOTOR)
  @Get()
  findAll() {
    return this.beneficiariosService.findAll();
  }

  @Roles(Role.BENEFICIARIO, Role.PROMOTOR)
  @Get('correo/:correo')
  getByCorreo(@Param('correo') correo: string) {
    return this.beneficiariosService.findOneByCorreo(correo);
  }

  @Roles(Role.BENEFICIARIO, Role.PROMOTOR)
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.beneficiariosService.findOneRelations(id);
  }

  @Roles(Role.PROMOTOR)
  @Post()
  create(@Body() payload: CreateBeneficiarioDto) {
    return this.beneficiariosService.create(payload);
  }

  @Roles(Role.BENEFICIARIO)
  @Public()
  @Post('login')
  logIn(@Body() payload: LogInBeneficiarioDto) {
    return this.beneficiariosService.logIn(payload);
  }

  @Roles(Role.BENEFICIARIO, Role.PROMOTOR)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBeneficiarioDto,
  ) {
    return this.beneficiariosService.update(id, payload);
  }

}
