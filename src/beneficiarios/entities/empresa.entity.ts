import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  IntegerType
} from 'typeorm';

import { Beneficiario } from './beneficiario.entity';
import { RepresentanteLegal } from './representante-legal.entity';
import { EmpresaGasto } from './pendientes/empresa-gasto.entity';

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

  @OneToOne(() => Beneficiario, (beneficiario) => beneficiario.empresa, { nullable: true })
  @JoinColumn()
  idBeneficiario: number;

  @OneToOne(() => RepresentanteLegal, (representante) => representante.empresa, { nullable: true })
  @JoinColumn()
  curpRepresentanteLegal: string;

}