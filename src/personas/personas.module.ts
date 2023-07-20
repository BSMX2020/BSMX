import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeneficiariosModule } from '../beneficiarios/beneficiarios.module';

import { PersonasController } from './controllers/personas.controller';
import { PersonasService } from './services/personas.service';
import { Persona } from './entities/persona.entity';

import { ReferenciasController } from '../personas/controllers/referencias.controller';
import { ReferenciasService } from './services/referencias.service';
import { Referencia } from '../personas/entities/referencia.entity';

import { RequisitosPersonaController } from '../personas/controllers/requisitos-persona.controller';
import { RequisitosPersonaService } from './services/requisitos-persona.service';
import { RequisitosPersona } from '../personas/entities/requisitosPersona.entity';

@Module({
  imports: [    
    BeneficiariosModule,
    TypeOrmModule.forFeature([    
      Persona,
      Referencia,
      RequisitosPersona
    ])],
  controllers: [
    PersonasController,
    ReferenciasController,
    RequisitosPersonaController
   ],
  providers: [
    PersonasService,
    ReferenciasService,
    RequisitosPersonaService
  ],  

})
export class PersonasModule {}
