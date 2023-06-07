import { 
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { Persona } from './persona.entity';

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
  salo: number;

  @OneToOne(() => Persona, (persona) => persona.beneficiario, { nullable: true })
  persona: Persona;
}