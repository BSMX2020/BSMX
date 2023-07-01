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
export class EmpresaTipo {

  @PrimaryGeneratedColumn()
  idEmpresaTipo: number;

  // @OneToOne(() => Empresa, (empresa) => empresa.empresaTipo, { nullable: true })
  // @JoinColumn()
  // rfcEmpresa: string;

  @Column({ type: 'varchar', length: 255 })  
  tipo: string;

}