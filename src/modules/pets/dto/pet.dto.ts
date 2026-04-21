import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { AgeUnit } from '../../../communs/enums/enums';

export class PetDto {
  @ApiProperty({
    example: 'PEQUI',
    description: 'Nombre de la mascota',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 'MESTIZO',
    description: 'Raza de la mascota',
  })
  @IsNotEmpty({ message: 'La raza es obligatoria' })
  @IsString()
  raza: string;

  @ApiProperty({
    example: 5,
    description: 'Edad numérica de la mascota',
  })
  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(0, { message: 'La edad no puede ser negativa' })
  @Max(50, { message: 'Edad fuera de rango permitido' })
  edad: number;

  @ApiProperty({
    example: 'años',
    enum: AgeUnit,
    description: 'Unidad de edad',
  })
  @IsEnum(AgeUnit, { message: 'Unidad de edad inválida' })
  edad_unidad: AgeUnit;

  @ApiProperty({
    example: 'uuid-del-cliente',
    description: 'ID del cliente dueño',
  })
  @IsUUID('4', { message: 'El id_cliente debe ser un UUID válido' })
  id_cliente: string;
}
export class UpdatePetDto {
  @ApiProperty({
    example: 'CUCA',
    description: 'Nombre de la mascota',
  })
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 'GOLDEN',
    description: 'Raza de la mascota',
  })
  @IsOptional()
  @IsString()
  raza: string;

  @ApiProperty({
    example: 5,
    description: 'Edad numérica de la mascota',
  })
  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(0, { message: 'La edad no puede ser negativa' })
  @Max(50, { message: 'Edad fuera de rango permitido' })
  edad: number;

  @ApiProperty({
    example: 'años',
    enum: AgeUnit,
    description: 'Unidad de edad',
  })
  @IsEnum(AgeUnit, { message: 'Unidad de edad inválida' })
  edad_unidad: AgeUnit;
}
