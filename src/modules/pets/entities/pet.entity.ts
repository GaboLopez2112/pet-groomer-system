import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AgeUnit } from '../../../communs/enums/enums';
import { UpperCaseTransformer } from '../../../communs/upercase/uppercase';
import { Appointment } from '../../appointment/entities/appointment.entity';
@Entity('mascotas')
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614114000',
    description: 'UUID único de mascota (formato estándar)',
  })
  id_mascota: string;
  @Column({
    type: 'varchar',
    nullable: false,
    transformer: new UpperCaseTransformer(),
  })
  @ApiProperty({
    example: 'PEQUI',
    description: 'Nombre de la mascota',
  })
  nombre: string;
  @Column({
    type: 'varchar',
    nullable: false,
    transformer: new UpperCaseTransformer(),
  })
  @ApiProperty({
    example: 'MESTIZO',
    description: 'Raza de la mascota',
  })
  raza: string;
  @Column({ type: 'int', nullable: false })
  @ApiProperty({
    example: '8',
    description: 'Valor numerico de la edad',
    minLength: 0,
    maxLength: 50,
  })
  edad: number;
  @Column({
    type: 'enum',
    nullable: false,
    enum: AgeUnit,
    default: AgeUnit.YEARS,
  })
  @ApiProperty({
    example: 'años',
    description: 'Unidad de tiempo de la edad',
    enum: AgeUnit,
    enumName: 'AgeUnit',
  })
  edad_unidad: AgeUnit;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => Customer, (customer) => customer.mascota, {
    cascade: ['insert', 'update'],
    onDelete:
      'CASCADE' /*restric no borra cleinte pero si mascota, casacade borra mascota cliente*/,
  })
  @JoinColumn({ name: 'id_cliente' })
  @ApiProperty({
    type: () => Customer,
    description: 'Dueño de la mascota (cliente registrado)',
    example: {
      id_cliente: '123e4567-e89b-12d3-a456-426614174000',
      nombre: 'CASTRO MORALES JUAN CARLOS',
    },
  })
  cliente: Customer;
  @OneToMany(() => Appointment, (appointment) => appointment.mascota)
  citas: Appointment[];
}
