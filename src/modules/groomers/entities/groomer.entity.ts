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
import { LowerCaseTransformer } from '../../../communs/lowerCase/loweCase';
import { Appointment } from '../../appointment/entities/appointment.entity';

@Entity('groomers')
export class Groomer {
  @ApiProperty({
    example: '123e4600-e89b-12d3-a456-426614174000',
    description: 'Id of the Groomer',
  })
  @PrimaryGeneratedColumn('uuid')
  id_peluquero: string;
  @ApiProperty({
    example: '1716450257',
    description: 'cedula peluquero',
  })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  cedula: string;
  @ApiProperty({
    example: 'ALBERTO CONTRERAS JUAN MIGUEL',
    description: 'nombre de peluquero',
  })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: new UpperCaseTransformer(),
  })
  nombre: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({
    example: '09855432',
    description: 'celular peluquero',
  })
  celular: string;
  @ApiProperty({
    example: 'peluquero@gmail.com',
    description: 'correo peluquero',
  })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    transformer: new LowerCaseTransformer(),
  })
  email: string;
  @Column({ type: 'boolean', nullable: false, default: true })
  @ApiProperty({
    example: 'true',
    description: 'estado del peluquero',
  })
  activo: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany(() => Appointment, (appointment) => appointment.peluquero)
  citas: Appointment[];
}
