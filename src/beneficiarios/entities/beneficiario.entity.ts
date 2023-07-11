import { 
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
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
  
  //--------------------------------------------

  @ManyToOne(() => Domicilio, (domicilio) => domicilio.id, { onDelete: 'CASCADE' })
  domicilio: number;

  //--------------------------------------------
  @OneToOne(() => Persona, (persona) => persona.beneficiario)
  persona: Persona;

  @OneToOne(() => Empresa, (empresa) => empresa.beneficiario)
  empresa: Empresa;
 
}