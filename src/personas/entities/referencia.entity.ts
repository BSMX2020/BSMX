import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
} from 'typeorm';

import { Persona } from './persona.entity';

@Entity()
export class Referencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 10 })
  telefono: string;

  //---------------------------------------------

  @ManyToOne(() => Persona, (persona) => persona.curp, { onDelete: 'CASCADE' })
  persona: string;

}