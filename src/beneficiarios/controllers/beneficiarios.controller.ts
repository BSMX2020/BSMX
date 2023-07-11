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
import { CreateBeneficiarioDto } from '../dtos/beneficiario.dto';
import { BeneficiariosService } from './../services/beneficiarios.service';

@ApiTags('beneficiarios')
@Controller('beneficiarios')
export class BeneficiariosController {

  constructor(private beneficiariosService: BeneficiariosService) { }

  @Get()
  findAll() {
    return this.beneficiariosService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.beneficiariosService.findOneRelations(id);
  }

  @Post()
  create(@Body() payload: CreateBeneficiarioDto) {
    return this.beneficiariosService.create(payload);
  }

}
