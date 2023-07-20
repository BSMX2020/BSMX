import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

import { Beneficiario } from '../../beneficiarios/entities/beneficiario.entity';
import { Referencia } from './referencia.entity';
import { RequisitosPersona } from './requisitosPersona.entity';

@Entity()
export class Persona {
  @PrimaryColumn({ type: 'varchar', length: 18 })
  curp: string;

  @Column({ type: 'varchar', length: 255 })
  apellidoPaterno: string;

  @Column({ type: 'varchar', length: 255 })
  apellidoMaterno: string;

  @Column({ type: 'varchar', length: 10 })
  telefono: string;

  @Column({ type: 'varchar', length: 255 })
  estado: string;

  @Column({ type: 'varchar', length: 255 })
  municipio: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ type: 'varchar', length: 255 })
  ocupacion: string;

  @Column({ type: 'varchar', length: 255 })
  localidad: string;

  @Column({ type: 'varchar', length: 255 })
  percepcionMensual: string;

  //--------------------------------------------

  @OneToOne(() => Beneficiario, (beneficiario) => beneficiario.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  beneficiario: number;

  //--------------------------------------------

  @OneToMany(() => Referencia, (referencia) => referencia.persona)
  referencias: Referencia[];

  @OneToOne(() => RequisitosPersona, (requisitosPersona) => requisitosPersona.persona)
  requisitosPersona: RequisitosPersona;

}