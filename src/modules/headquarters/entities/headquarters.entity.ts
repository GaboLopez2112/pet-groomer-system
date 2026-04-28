import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UpperCaseTransformer } from '../../../communs/upercase/uppercase';
import { Appointment } from '../../appointment/entities/appointment.entity';

@Entity('headquarters')
export class Headquarters {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID único de la sucursal',
  })
  id_sucursal: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    transformer: new UpperCaseTransformer(),
  })
  @ApiProperty({
    example: 'SUCURSAL NORTE',
    description: 'Nombre de la sucursal',
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: new UpperCaseTransformer(),
  })
  @ApiProperty({
    example: 'AV. AMAZONAS N45-23 Y LA PRENSA',
    description: 'Dirección física de la sucursal',
  })
  direccion: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  @ApiProperty({
    example: '023456789',
    description: 'Teléfono de contacto de la sucursal',
  })
  telefono: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  @ApiProperty({
    example: true,
    description: 'Estado de la sucursal (activa/inactiva)',
  })
  activo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.headquarter)
  citas: Appointment[];
}
