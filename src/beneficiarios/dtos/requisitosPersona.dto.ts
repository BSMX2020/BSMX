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

export class CreateRequisitosPersonaDto {

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly fotoCasa: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly rfc: string;

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
  readonly curp: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly comprobanteIngresos: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  readonly comprobanteDomicilio: string;

  @IsString()
  @IsNotEmpty()  
  @Matches(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/, {
    message:
      'Formato de CURP inválido',
  })
  @ApiProperty()
  readonly persona: string;

}