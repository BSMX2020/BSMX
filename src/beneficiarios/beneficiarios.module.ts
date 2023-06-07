import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeneficiariosController } from './controllers/beneficiarios.controller';
import { BeneficiariosService } from './services/beneficiarios.service';
import { Beneficiario } from './entities/beneficiario.entity';

import { PersonasController } from './controllers/personas.controller';
import { PersonasService } from './services/personas.service';
import { Persona } from './entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficiario, Persona])],
  controllers: [BeneficiariosController, PersonasController],
  providers: [BeneficiariosService, PersonasService]
})
export class BeneficiariosModule {}
