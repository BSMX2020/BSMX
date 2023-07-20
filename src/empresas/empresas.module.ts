import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeneficiariosModule } from '../beneficiarios/beneficiarios.module';

import { EmpresasController } from './controllers/empresas.controller';
import { EmpresasService } from './services/empresas.service';
import { Empresa } from '../empresas/entities/empresa.entity';

import { RepresentantesLegalesController } from './controllers/representantes-legales.controller';
import { RepresentantesLegalesService } from './services/representantes-legales.service';
import { RepresentanteLegal } from '../empresas/entities/representante-legal.entity';

import { RequisitosEmpresaController } from './controllers/requisitos-empresa.controller';
import { RequisitosEmpresaService } from './services/requisitos-empresa.service';
import { RequisitosEmpresa } from '../empresas/entities/requisitosEmpresa.entity';

@Module({
  imports: [    
    BeneficiariosModule,
    TypeOrmModule.forFeature([    
      Empresa,
      RepresentanteLegal,
      RequisitosEmpresa
    ])],
  controllers: [
    EmpresasController,
    RepresentantesLegalesController,
    RequisitosEmpresaController
  ],
  providers: [
    EmpresasService,
    RepresentantesLegalesService,
    RequisitosEmpresaService,
  ],
})
export class EmpresasModule {}
