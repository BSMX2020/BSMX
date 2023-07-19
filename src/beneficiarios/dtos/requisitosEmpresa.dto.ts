import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsPositive,
  IsDateString,
  Matches
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequisitosEmpresaDto {

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly reciboPagoSolicitud: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly ine: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly fotoCaraIne: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly fotoMercancia: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly fotoExteriorNegocio: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly fotoInteriorNegocio: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly curp: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly comprobanteDomicilio: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly comprobanteIngresos: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly acreditacionJuridica: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly rfc: string;

  @IsString()
  @IsNotEmpty()  
  @Matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, {
    message:
      'Formato de RFC inválido',
  })
  @ApiProperty()
  readonly empresa: string;

}