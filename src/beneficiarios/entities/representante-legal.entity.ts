import { 
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany
} from 'typeorm';

import { Empresa } from './empresa.entity';

@Entity()
export class RepresentanteLegal {
  @PrimaryColumn({ type: 'varchar', length: 18 })  
  curp: string;

  @Column({ type: 'varchar', length: 255 })
  apellidoPaterno: string;

  @Column({ type: 'varchar', length: 255 })
  apellidoMaterno: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ type: 'varchar', length: 10 })
  telefono: string;

  @Column({ type: 'varchar', length: 255 })
  tipoAcreditacion: string;

  //---------------------------------------------

  @OneToMany(() => Empresa, (empresa) => empresa.representanteLegal)
  empresas: Empresa[];
  
}