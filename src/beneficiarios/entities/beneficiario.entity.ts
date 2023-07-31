import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Persona } from '../../personas/entities/persona.entity';
import { Empresa } from '../../empresas/entities/empresa.entity';
import { Domicilio } from './domicilio.entity';
import { Transaccion } from './transaccion.entity';
import { LineaCredito } from './lineaCredito.entity';

@Entity()
export class Beneficiario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  correo: string;

  @Column({ type: 'varchar', length: 255 })
  contrasenia: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  foto: string;

  @Column({ type: 'int', nullable: true })
  saldo: number;

  //--------------------------------------------

  @ManyToOne(() => Domicilio, (domicilio) => domicilio.id, { onDelete: 'CASCADE' })
  domicilio: number;

  //--------------------------------------------
  @OneToOne(() => Persona, (persona) => persona.beneficiario)
  persona: Persona;

  @OneToOne(() => Empresa, (empresa) => empresa.beneficiario)
  empresa: Empresa;

  @OneToOne(() => LineaCredito, (lineaCredito) => lineaCredito.beneficiario)
  lineaCredito: LineaCredito;

  @OneToMany(() => Transaccion, (transaccion) => transaccion.beneficiarioEmisor)
  transaccionesEmisor: Transaccion[];

  @OneToMany(() => Transaccion, (transaccion) => transaccion.beneficiarioReceptor)
  transaccionesReceptor: Transaccion[];

}