import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Pet } from '../../pets/entities/pet.entity';
import { Service } from '../../services/entities/service.entity';
import { Groomer } from '../../groomers/entities/groomer.entity';
import { Headquarters } from '../../headquarters/entities/headquarters.entity';
import { AppointmentStatus } from '../../../communs/enums/enums';
@Entity('citas')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID único de la cita',
  })
  id_cita: string;

  @ManyToOne(() => Pet, (pet) => pet.citas)
  @JoinColumn({ name: 'id_mascota' })
  @ApiProperty({
    type: () => Pet,
    description: 'Mascota que recibe el servicio',
  })
  mascota: Pet;

  @ManyToOne(() => Service, (service) => service.citas)
  @JoinColumn({ name: 'id_servicio' })
  @ApiProperty({
    type: () => Service,
    description: 'Servicio agendado',
  })
  servicio: Service;

  @ManyToOne(() => Groomer, (groomer) => groomer.citas)
  @JoinColumn({ name: 'id_peluquero' })
  @ApiProperty({
    type: () => Groomer,
    description: 'Peluquero asignado',
  })
  peluquero: Groomer;

  @ManyToOne(() => Headquarters, (headquarter) => headquarter.citas)
  @JoinColumn({ name: 'id_sucursal' })
  @ApiProperty({
    type: () => Headquarters,
    description: 'Sucursal donde se realiza la cita',
  })
  headquarter: Headquarters;

  @Column({ type: 'date', nullable: false })
  @ApiProperty({
    example: '2026-05-15',
    description: 'Fecha de la cita',
  })
  fecha: string;

  @Column({ type: 'time', nullable: false })
  @ApiProperty({
    example: '10:30:00',
    description: 'Hora de la cita',
  })
  hora: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
    nullable: false,
  })
  @ApiProperty({
    example: 'pendiente',
    description: 'Estado de la cita',
    enum: AppointmentStatus,
  })
  estado: AppointmentStatus;

  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha de creación del registro' })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Fecha de última actualización' })
  updated_at: Date;
}
