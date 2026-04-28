import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';

export class HeadquartersDto {
  @ApiProperty({ example: 'SUCURSAL NORTE' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @Length(3, 100)
  nombre: string;

  @ApiProperty({ example: 'AV. AMAZONAS N45-23 Y LA PRENSA' })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsString()
  @Length(10, 255)
  direccion: string;

  @ApiProperty({ example: '023456789' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsString()
  @Matches(/^[0-9-]+$/, { message: 'Teléfono inválido' })
  telefono: string;

  @ApiProperty({ example: true, required: false })
  @IsNotEmpty()
  @IsBoolean()
  activo?: boolean;
}
export class UpdateHeadquartersDto {
  @ApiProperty({ example: 'SUCURSAL NORTE' })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  nombre: string;

  @ApiProperty({ example: 'AV. AMAZONAS N45-23 Y LA PRENSA' })
  @IsOptional()
  @IsString()
  @Length(10, 255)
  direccion: string;

  @ApiProperty({ example: '023456789' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9-]+$/, { message: 'Teléfono inválido' })
  telefono: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
