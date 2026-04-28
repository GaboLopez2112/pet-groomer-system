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

@Entity('service')
export class Service {
  @ApiProperty({
    example: '123e4666-e89b-12d3-a456-426614174000',
    description: 'Id servicio auto generado',
  })
  @PrimaryGeneratedColumn('uuid')
  id_servicio: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: new UpperCaseTransformer(),
  })
  @ApiProperty({
    example: 'CORTE DE UÑAS',
    description: 'nombre del servicio',
  })
  nombre: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    example: 'CORTE DE UÑAS CON LIMADORA',
    description: 'descripcion del servicio',
  })
  descripcion: string;
  @Column({ type: 'float', nullable: false })
  @ApiProperty({
    example: 5.5,
    description: 'precio del servicio',
  })
  costo: number;
  @Column({ type: 'boolean', nullable: false, default: true })
  @ApiProperty({
    example: true,
    description: 'estado del servicio',
  })
  estado: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany(() => Appointment, (appointment) => appointment.servicio)
  citas: Appointment[];
}
