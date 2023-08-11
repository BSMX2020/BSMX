import { 
  IsString,
  IsNotEmpty,
  IsEmail, 
  Length, 
  IsOptional, 
  IsPositive, 
  IsDateString, 
  Matches } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateEmpresaDto { 
  @IsString()
  @IsNotEmpty()  
  @Matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, {
    message:
      'Formato de RFC inválido',
  })
  @ApiProperty()
  readonly rfc: string;  

  @IsString()
  @IsNotEmpty()   
  @ApiProperty()
  readonly ingresoMensual: string;

  @IsString()
  @IsNotEmpty()   
  @ApiProperty()
  readonly antiguedad: string;

  @IsString()
  @IsNotEmpty()   
  @ApiProperty()
  readonly tipoGiro: string;

  @IsString()
  @IsNotEmpty()   
  @ApiProperty()
  readonly gasto: string;

  @IsString()
  @IsNotEmpty()   
  @ApiProperty()
  readonly utilidad: string;

  @IsString()
  @IsNotEmpty()   
  @ApiProperty()
  readonly empresaTipo: string;
  
  @IsNotEmpty()   
  @IsPositive()
  @ApiProperty()
  readonly beneficiario: number;

  @IsString()
  @IsNotEmpty()  
  @Matches(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/, {
    message:
      'Formato de CURP inválido',
  })
  @ApiProperty()
  readonly representanteLegal: string;  

}