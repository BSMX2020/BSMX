import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeneficiariosController } from './controllers/beneficiarios.controller';
import { BeneficiariosService } from './services/beneficiarios.service';
import { Beneficiario } from './entities/beneficiario.entity';

import { PersonasController } from './controllers/personas.controller';
import { PersonasService } from './services/personas.service';
import { Persona } from './entities/persona.entity';

import { RepresentantesLegalesController } from './controllers/representantes-legales.controller';
import { RepresentantesLegalesService } from './services/representantes-legales.service';
import { RepresentanteLegal } from './entities/representante-legal.entity';

import { DomiciliosController } from './controllers/domicilios.controller';
import { DomiciliosService } from './services/domicilios.service';
import { Domicilio } from './entities/domicilio.entity';

import { EmpresasController } from './controllers/empresas.controller';
import { EmpresasService } from './services/empresas.service';
import { Empresa } from './entities/empresa.entity';

import { ReferenciasController } from './controllers/referencias.controller';
import { ReferenciasService } from './services/referencias.service';
import { Referencia } from './entities/referencia.entity';

import { TransaccionesController } from './controllers/transacciones.controller';
import { TransaccionesService } from './services/transacciones.service';
import { Transaccion } from './entities/transaccion.entity';

import { RequisitosPersonaController } from './controllers/requisitos-persona.controller';
import { RequisitosPersonaService } from './services/requisitos-persona.service';
import { RequisitosPersona } from './entities/requisitosPersona.entity';

import { RequisitosEmpresaController } from './controllers/requisitos-empresa.controller';
import { RequisitosEmpresaService } from './services/requisitos-empresa.service';
import { RequisitosEmpresa } from './entities/requisitosEmpresa.entity';

import { LineasCreditoController } from './controllers/lineas-credito.controller';
import { LineasCreditoService } from './services/lineas-credito.service';
import { LineaCredito } from './entities/lineaCredito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Domicilio,
    Beneficiario,
    Persona,
    RepresentanteLegal,
    Empresa,
    Referencia,
    Transaccion,
    RequisitosPersona,
    RequisitosEmpresa,
    LineaCredito])],
  controllers: [
    DomiciliosController,
    BeneficiariosController, 
    PersonasController, 
    EmpresasController, 
    ReferenciasController, 
    RepresentantesLegalesController,     
    RequisitosPersonaController,
    TransaccionesController,
    RequisitosEmpresaController,
    LineasCreditoController],
  providers: [
    DomiciliosService, 
    BeneficiariosService, 
    PersonasService, 
    RepresentantesLegalesService, 
    EmpresasService, 
    ReferenciasService,     
    RequisitosPersonaService, 
    TransaccionesService, 
    RequisitosEmpresaService, 
    LineasCreditoService]
})
export class BeneficiariosModule {}
