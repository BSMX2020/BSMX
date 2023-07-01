import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn
} from 'typeorm';

import { Empresa } from '../empresa.entity';

@Entity()
export class EmpresaGasto {

  @PrimaryGeneratedColumn()
  idEmpresaGasto: number;

  // @OneToOne(() => Empresa, (empresa) => empresa.empresaGasto, { nullable: true })
  // @JoinColumn()
  // rfcEmpresa: string;

  @Column({ type: 'varchar', length: 255 })
  gasto: string;

}