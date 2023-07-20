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

export class CreateReferenciaDto {  

  @IsString()
  @IsNotEmpty()   
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()   
  @Matches(/^\d{10}$/, {
    message:
      'Formato de teléfono debe de ser de 10 dígitos',
  })  
  @ApiProperty()
  readonly telefono: string;

  @IsString()
  @IsNotEmpty()  
  @Matches(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/, {
    message:
      'Formato de CURP inválido',
  })
  @ApiProperty()
  readonly persona: string;  

}