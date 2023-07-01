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

import { Beneficiario } from './beneficiario.entity';

@Entity()
export class Domicilio {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })  
  calle: string;

  @Column({ type: 'varchar', length: 255 })  
  colonia: string;
  
  @Column({ type: 'varchar', length: 255 })  
  estado: string;

  @Column({ type: 'varchar', length: 255 })  
  municipio: string;

  @Column({ type: 'varchar', length: 255 })  
  localidad: string;

  @Column({ type: 'varchar', length: 255 })  
  codigoPostal: string;

  @Column({ type: 'varchar', length: 255 })  
  numeroExterior: string;

  @Column({ type: 'varchar', length: 255 })  
  numeroInterior: string;

  @OneToOne(() => Beneficiario, (beneficiario) => beneficiario.domicilio, { nullable: true })
  @JoinColumn()
  idBeneficiario: number;
  
}