import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeneficiariosController } from './controllers/beneficiarios.controller';
import { BeneficiariosService } from './services/beneficiarios.service';
import { Beneficiario } from './entities/beneficiario.entity';

import { DomiciliosController } from './controllers/domicilios.controller';
import { DomiciliosService } from './services/domicilios.service';
import { Domicilio } from './entities/domicilio.entity';

import { TransaccionesController } from './controllers/transacciones.controller';
import { TransaccionesService } from './services/transacciones.service';
import { Transaccion } from './entities/transaccion.entity';

import { LineasCreditoController } from './controllers/lineas-credito.controller';
import { LineasCreditoService } from './services/lineas-credito.service';
import { LineaCredito } from './entities/lineaCredito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Domicilio,
      Beneficiario,     
      Transaccion,      
      LineaCredito])],
  controllers: [
    DomiciliosController,
    BeneficiariosController,   
    TransaccionesController,    
    LineasCreditoController],
  providers: [
    DomiciliosService,
    BeneficiariosService,        
    TransaccionesService,    
    LineasCreditoService],
  exports: [BeneficiariosService],
})
export class BeneficiariosModule { }
