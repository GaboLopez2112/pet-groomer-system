import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { AppointmentStatus } from '../../../communs/enums/enums';

export class AppointmentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty({ message: 'El ID de la mascota es obligatorio' })
  @IsString()
  id_mascota: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsNotEmpty({ message: 'El ID del servicio es obligatorio' })
  @IsString()
  id_servicio: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  @IsNotEmpty({ message: 'El ID del peluquero es obligatorio' })
  @IsString()
  id_peluquero: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003' })
  @IsNotEmpty({ message: 'El ID de la sucursal es obligatorio' })
  @IsString()
  id_sucursal: string;

  @ApiProperty({ example: '2026-05-15' })
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  @IsDateString()
  fecha: string;

  @ApiProperty({ example: '10:30:00' })
  @IsNotEmpty({ message: 'La hora es obligatoria' })
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'La hora debe tener formato HH:MM:SS',
  })
  hora: string;

  @ApiProperty({
    example: 'pendiente',
    enum: AppointmentStatus,
    required: false,
  })
  @IsEnum(AppointmentStatus)
  estado?: AppointmentStatus;
}
export class UpdateAppointmentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsString()
  id_mascota: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsOptional()
  @IsString()
  id_servicio: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  @IsOptional()
  @IsString()
  id_peluquero: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003' })
  @IsOptional()
  @IsString()
  id_sucursal: string;

  @ApiProperty({ example: '2026-05-15' })
  @IsOptional()
  @IsDateString()
  fecha: string;

  @ApiProperty({ example: '10:30:00' })
  @IsOptional()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'La hora debe tener formato HH:MM:SS',
  })
  hora: string;

  @ApiProperty({
    example: 'pendiente',
    enum: AppointmentStatus,
    required: false,
  })
  @IsEnum(AppointmentStatus)
  estado?: AppointmentStatus;
}
