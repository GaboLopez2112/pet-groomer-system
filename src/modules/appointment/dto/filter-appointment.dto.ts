import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsDateString, IsString } from 'class-validator';

export class FilterAppointmentDto {
  @ApiProperty({
    example: '2026-05-20',
    description: 'Filtrar por fecha (formato YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  fecha?: string;

  @ApiProperty({
    example: 'c6767de4-433f-4f13-ba5c-475af1eb43ac',
    description: 'Filtrar por ID de sucursal',
    required: false,
  })
  @IsOptional()
  @IsUUID('all', { message: 'El ID de sucursal debe ser un UUID válido' })
  sucursal?: string;

  @ApiProperty({
    example: '672f8ead-e384-4748-98a6-87815502a426',
    description: 'Filtrar por ID de peluquero',
    required: false,
  })
  @IsOptional()
  @IsUUID('all', { message: 'El ID de peluquero debe ser un UUID válido' })
  peluquero?: string;

  @ApiProperty({
    example: 'pendiente',
    description: 'Filtrar por estado (pendiente, completado, cancelado)',
    required: false,
  })
  @IsOptional()
  @IsString()
  estado?: string;
}
