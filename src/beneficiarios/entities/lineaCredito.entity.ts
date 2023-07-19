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

import { Beneficiario } from './beneficiario.entity';

@Entity()
export class LineaCredito {
  @PrimaryColumn({ type: 'varchar', length: 255 })  
  folio: string;

  @Column({ type: 'varchar', length: 255 })
  fotoBaucher: string;

  @Column({ type: 'date' })
  fechaProxPago: Date;

  @Column({ type: 'int', nullable: true})
  creditoOtorgado: number;

  @Column({ type: 'int', nullable: true})
  montoProxPago: number;
  
  //--------------------------------------------

  @OneToOne(() => Beneficiario, (beneficiario) => beneficiario.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  beneficiario: number;

}