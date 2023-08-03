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
import { CreateBeneficiarioDto, UpdateBeneficiarioDto, LogInBeneficiarioDto } from '../dtos/beneficiario.dto';
import { BeneficiariosService } from './../services/beneficiarios.service';

@ApiTags('beneficiarios')
@Controller('beneficiarios')
export class BeneficiariosController {

  constructor(private beneficiariosService: BeneficiariosService) { }

  @Get()
  findAll() {
    return this.beneficiariosService.findAll();
  }

  @Get('correo/:correo')
  getByCorreo(@Param('correo') correo: string) {
    return this.beneficiariosService.findOneByCorreo(correo);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.beneficiariosService.findOneRelations(id);
  }

  @Post()
  create(@Body() payload: CreateBeneficiarioDto) {
    return this.beneficiariosService.create(payload);
  }

  @Post('login')
  logIn(@Body() payload: LogInBeneficiarioDto) {
    return this.beneficiariosService.logIn(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBeneficiarioDto,
  ) {
    return this.beneficiariosService.update(id, payload);
  }

}
