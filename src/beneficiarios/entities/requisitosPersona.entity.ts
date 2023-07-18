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

import { Persona } from './persona.entity';

@Entity()
export class RequisitosPersona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fotoCasa: string;

  @Column({ type: 'varchar', length: 255 })
  rfc: string;

  @Column({ type: 'varchar', length: 255 })
  reciboPagoSolicitud: string;

  @Column({ type: 'varchar', length: 255 })
  ine: string;

  @Column({ type: 'varchar', length: 255 })
  curp: string;

  @Column({ type: 'varchar', length: 255 })
  comprobanteIngresos: string;

  @Column({ type: 'varchar', length: 255 })
  comprobanteDomicilio: string;

  //--------------------------------------------

  @OneToOne(() => Persona, (persona) => persona.curp, { onDelete: 'CASCADE' })
  @JoinColumn()
  persona: string;

}