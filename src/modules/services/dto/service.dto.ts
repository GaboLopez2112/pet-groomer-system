import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class ServiceDto {
  @IsNotEmpty({ message: 'campo no vacio' })
  @IsString()
  nombre: string;
  @Length(0, 500, { message: 'La descripción no puede exceder 500 caracteres' })
  descripcion?: string;
  @IsNumber({}, { message: 'solo se permite numeros' })
  @IsNotEmpty({ message: 'campo no vacio' })
  costo: number;
  @IsBoolean()
  @IsNotEmpty({ message: 'campo no vacio' })
  estado: boolean;
}
export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  nombre: string;
  @IsOptional()
  @Length(0, 500, { message: 'La descripción no puede exceder 500 caracteres' })
  descripcion?: string;
  @IsNumber({}, { message: 'solo se permite numeros' })
  @IsOptional()
  costo: number;
  @IsBoolean()
  @IsOptional()
  estado;
}
