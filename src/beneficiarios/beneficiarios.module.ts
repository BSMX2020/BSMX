import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeneficiariosController } from './controllers/beneficiarios.controller';
import { BeneficiariosService } from './services/beneficiarios.service';
import { Beneficiario } from './entities/beneficiario.entity';

import { PersonasController } from './controllers/personas.controller';
import { PersonasService } from './services/personas.service';
import { Persona } from './entities/persona.entity';
import { RepresentantesLegalesService } from './services/representantes-legales.service';
import { DomiciliosService } from './services/domicilios.service';
import { EmpresasService } from './services/empresas.service';
import { ReferenciasService } from './services/referencias.service';
import { DomiciliosController } from './controllers/domicilios.controller';
import { EmpresasController } from './controllers/empresas.controller';
import { ReferenciasController } from './controllers/referencias.controller';
import { RepresentantesLegalesController } from './controllers/representantes-legales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficiario, Persona])],
  controllers: [BeneficiariosController, PersonasController, DomiciliosController, EmpresasController, ReferenciasController, RepresentantesLegalesController],
  providers: [BeneficiariosService, PersonasService, RepresentantesLegalesService, DomiciliosService, EmpresasService, ReferenciasService]
})
export class BeneficiariosModule {}
