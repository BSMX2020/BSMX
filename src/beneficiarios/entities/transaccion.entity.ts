import { 
  PrimaryColumn,
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import { Beneficiario } from './beneficiario.entity';

@Entity()
export class Transaccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int'})
  monto: number;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

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