import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroomerDto {
  @ApiProperty({
    example: '1716450244',
    description: 'Cédula del peluqueroo (solo números, 10-13 dígitos)',
  })
  @IsString()
  @IsNotEmpty({ message: 'campo no vacio' })
  @Length(10, 13, { message: 'La cédula debe tener entre 10 y 13 dígitos' })
  cedula: string;
  @ApiProperty({
    example: 'GALLO SUAREZ JAVIER ALEJANDRO',
    description: 'nombre del peluqueroo ',
  })
  @IsString()
  @IsNotEmpty({ message: 'campo no vacio' })
  nombre: string;
  @IsString()
  @IsNotEmpty({ message: 'campo no vacio' })
  @Length(7, 15, { message: 'El celular debe tener entre 7 y 15 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'El celular solo debe contener números' })
  @ApiProperty({
    example: '09658447',
    description: 'Celualr del peluqueroo',
  })
  celular: string;
  @ApiProperty({
    example: 'peluquero@hotmail.com',
    description: 'Mail del peluqueroo ',
  })
  @IsNotEmpty({ message: 'campo no vacio' })
  @IsEmail({}, { message: 'Email no valido' })
  email: string;
  @ApiProperty({
    example: true,
    description: 'Estado del peluquero',
  })
  @IsBoolean()
  @IsNotEmpty({ message: 'campo no vacio' })
  activo: boolean;
}
export class UpdateGroomerDto {
  @ApiProperty({
    example: '1716450244',
    description: 'Cédula del peluqueroo (solo números, 10-13 dígitos)',
  })
  @IsString()
  @IsOptional()
  @Length(10, 13, { message: 'La cédula debe tener entre 10 y 13 dígitos' })
  cedula: string;
  @ApiProperty({
    example: 'GALLO SUAREZ JAVIER ALEJANDRO',
    description: 'nombre del peluqueroo ',
  })
  @IsString()
  @IsNotEmpty({ message: 'campo no vacio' })
  nombre: string;
  @IsString()
  @IsOptional()
  @Length(7, 15, { message: 'El celular debe tener entre 7 y 15 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'El celular solo debe contener números' })
  @ApiProperty({
    example: '09658447',
    description: 'Celualr del peluqueroo',
  })
  celular: string;
  @ApiProperty({
    example: 'peluquero@hotmail.com',
    description: 'Mail del peluqueroo ',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email no valido' })
  email: string;
  @ApiProperty({
    example: false,
    description: 'Estado del peluquero',
  })
  @IsBoolean()
  @IsOptional()
  activo: boolean;
}
