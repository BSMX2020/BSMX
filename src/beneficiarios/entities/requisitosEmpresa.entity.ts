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

import { Empresa } from './empresa.entity';

@Entity()
export class RequisitosEmpresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  reciboPagoSolicitud: string;

  @Column({ type: 'varchar', length: 255 })
  ine: string;

  @Column({ type: 'varchar', length: 255 })
  fotoCaraIne: string;

  @Column({ type: 'varchar', length: 255 })
  fotoMercancia: string;

  @Column({ type: 'varchar', length: 255 })
  fotoExteriorNegocio: string;

  @Column({ type: 'varchar', length: 255 })
  fotoInteriorNegocio: string;

  @Column({ type: 'varchar', length: 255 })
  curp: string;

  @Column({ type: 'varchar', length: 255 })
  comprobanteDomicilio: string;

  @Column({ type: 'varchar', length: 255 })
  comprobanteIngresos: string;

  @Column({ type: 'varchar', length: 255 })
  acreditacionJuridica: string;

  @Column({ type: 'varchar', length: 255 })
  rfc: string;

  //--------------------------------------------

  @OneToOne(() => Empresa, (empresa) => empresa.rfc, { onDelete: 'CASCADE' })
  @JoinColumn()
  empresa: string;

}