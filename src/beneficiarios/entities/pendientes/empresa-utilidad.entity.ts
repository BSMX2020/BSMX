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

import { Empresa } from './empresa.entity';

@Entity()
export class EmpresaUtilidad {

  @PrimaryGeneratedColumn()
  idEmpresaUtilidad: number;

  // @OneToOne(() => Empresa, (empresa) => empresa.empresaUtilidad, { nullable: true })
  // @JoinColumn()
  // rfcEmpresa: string;

  @Column({ type: 'varchar', length: 255 })  
  utilidad: string;

}