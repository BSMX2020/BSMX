import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  IntegerType
} from 'typeorm';

import { Beneficiario } from './beneficiario.entity';
import { RepresentanteLegal } from './representante-legal.entity';

@Entity()
export class Empresa {
  @PrimaryColumn({ type: 'varchar', length: 13 })
  rfc: string;

  @Column({ type: 'varchar', length: 255 })
  folioSolicitud: string;

  @Column({ type: 'varchar', length: 255 })
  ingresoMensual: string;

  @Column({ type: 'varchar', length: 255 })
  antiguedad: string;

  @Column({ type: 'varchar', length: 255 })
  tipoGiro: string;

  @Column({ type: 'varchar', length: 255 })
  gasto: string;

  @Column({ type: 'varchar', length: 255 })
  percepcionMensual: string;

  @Column({ type: 'varchar', length: 255 })
  utilidad: string;

  @Column({ type: 'varchar', length: 255 })
  empresaTipo: string;

  //---------------------------------------------

  @OneToOne(() => Beneficiario, (beneficiario) => beneficiario.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  beneficiario: number;

  @ManyToOne(() => RepresentanteLegal, (representante) => representante.curp, { onDelete: 'CASCADE' })
  representanteLegal: string;

}