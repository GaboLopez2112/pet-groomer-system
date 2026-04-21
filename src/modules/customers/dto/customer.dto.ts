import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  Length,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class CustomerDto {
  @ApiProperty({
    example: '1716450250',
    description: 'Cédula del cliente (solo números, 10-13 dígitos)',
  })
  @IsNotEmpty({ message: 'La cédula es obligatoria' })
  @IsString({ message: 'La cédula debe ser un texto' })
  @Length(10, 13, { message: 'La cédula debe tener entre 10 y 13 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'La cédula solo debe contener números' })
  cedula: string;

  @ApiProperty({
    example: 'CASTRO MORALES JUAN CARLOS',
    description: 'Nombre completo del cliente',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  nombre: string;

  @ApiProperty({
    example: '0962823368',
    description: 'Número de celular principal',
  })
  @IsNotEmpty({ message: 'El celular es obligatorio' })
  @IsString({ message: 'El celular debe ser un texto' })
  @Length(7, 15, { message: 'El celular debe tener entre 7 y 15 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'El celular solo debe contener números' })
  celular: string;

  @ApiProperty({
    example: '2600508',
    description: 'Número de teléfono opcional',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El celular opcional debe ser un texto' })
  @Length(7, 15, {
    message: 'El celular opcional debe tener entre 7 y 15 dígitos',
  })
  @Matches(/^[0-9]+$/, {
    message: 'El celular opcional solo debe contener números',
  })
  celular_opcional?: string;

  @ApiProperty({
    example: 'cliente@hotmail.com',
    description: 'Correo electrónico del cliente',
  })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;
}

export class UpdateCustomerDto {
  @ApiProperty({
    example: '1716450258',
    description: 'Cédula del cliente (solo números, 10-13 dígitos)',
  })
  @IsOptional()
  @IsString({ message: 'La cédula debe ser un texto' })
  @Length(10, 13, { message: 'La cédula debe tener entre 10 y 13 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'La cédula solo debe contener números' })
  cedula: string;

  @ApiProperty({
    example: 'CASTRO MORALES JUAN JOSE',
    description: 'Nombre completo del cliente',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  nombre: string;

  @ApiProperty({
    example: '0962823365',
    description: 'Número de celular principal',
  })
  @IsOptional()
  @IsString({ message: 'El celular debe ser un texto' })
  @Length(7, 15, { message: 'El celular debe tener entre 7 y 15 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'El celular solo debe contener números' })
  celular: string;

  @ApiProperty({
    example: '2600502',
    description: 'Número de teléfono opcional',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El celular opcional debe ser un texto' })
  @Length(7, 15, {
    message: 'El celular opcional debe tener entre 7 y 15 dígitos',
  })
  @Matches(/^[0-9]+$/, {
    message: 'El celular opcional solo debe contener números',
  })
  celular_opcional?: string;

  @ApiProperty({
    example: 'cliente2@hotmail.com',
    description: 'Correo electrónico del cliente',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;
}
