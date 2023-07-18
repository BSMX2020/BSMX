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
  @Matches(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/, {
    message:
      'Formato de RFC inválido',
  })
  @ApiProperty()
  readonly empresa: string;

}