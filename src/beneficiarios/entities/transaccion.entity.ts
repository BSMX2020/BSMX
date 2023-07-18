import { 
  PrimaryColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import { Beneficiario } from './beneficiario.entity';

@Entity()
export class Transaccion {
  @PrimaryColumn({ type: 'varchar', length: 255 })  
  folio: string;

  @Column({ type: 'int'})
  monto: number;

  @CreateDateColumn({
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  fecha: Date;

  @ManyToOne(() => Beneficiario, (beneficiario) => beneficiario.id, { onDelete: 'CASCADE' })
  beneficiarioEmisor: number;

  @ManyToOne(() => Beneficiario, (beneficiario) => beneficiario.id, { onDelete: 'CASCADE' })
  beneficiarioReceptor: number;
}