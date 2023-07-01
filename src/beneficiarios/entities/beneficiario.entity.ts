import { 
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { Persona } from './persona.entity';
import { Empresa } from './empresa.entity';
import { Domicilio } from './domicilio.entity';

@Entity()
export class Beneficiario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  correo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  foto: string;

  @Column({ type: 'int', nullable: true})
  saldo: number;

  @OneToOne(() => Persona, (persona) => persona.idBeneficiario, { nullable: true })
  persona: Persona;

  @OneToOne(() => Empresa, (empresa) => empresa.idBeneficiario, { nullable: true })
  empresa: Empresa;

  @OneToOne(() => Domicilio, (domicilio) => domicilio.idBeneficiario, { nullable: true })
  domicilio: Domicilio;
}