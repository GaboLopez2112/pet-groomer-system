import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Pet } from '../../pets/entities/pet.entity';
import { UpperCaseTransformer } from '../../../communs/upercase/uppercase';
import { LowerCaseTransformer } from '../../../communs/lowerCase/loweCase';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID único del cliente (formato estándar)',
  })
  id_cliente: string;
  @Column({ type: 'varchar', unique: true, nullable: false })
  @ApiProperty({
    example: '1716450250',
    description: 'Cedula de cliente',
  })
  cedula: string;
  @Column({
    nullable: false,
    type: 'varchar',
    transformer: new UpperCaseTransformer(),
  })
  @ApiProperty({
    example: 'CASTRO MORALES JUAN CARLOS',
    description: 'nombre de cliente',
  })
  nombre: string;
  @Column({ nullable: false, length: 15, type: 'varchar' })
  @ApiProperty({
    example: '0962823368',
    description: 'celular de cliente',
  })
  celular: string;
  @Column({ nullable: true, length: 15, type: 'varchar' })
  @ApiProperty({
    example: '2600508',
    description: 'celular_opcional de cliente',
  })
  celular_opcional?: string;
  @Column({
    nullable: false,
    type: 'varchar',
    unique: true,
    transformer: new LowerCaseTransformer(),
  })
  @ApiProperty({
    example: 'cliente@hotmail.com',
    description: 'email de cliente',
  })
  email: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany(() => Pet, (mascota) => mascota.cliente)
  @ApiProperty({
    type: () => [Pet],
    description: 'Lista de mascotas del cliente',
    required: false,
  })
  mascota: Pet[];
}
