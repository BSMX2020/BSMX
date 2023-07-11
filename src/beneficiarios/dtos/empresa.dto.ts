import { IsString, IsNotEmpty, IsEmail, Length, IsOptional, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateEmpresaDto { 
  @IsString()
  @IsNotEmpty() 
  @Length(13) 
  @ApiProperty()
  readonly rfc: string;

  @IsString()
  @IsNotEmpty()   
  @ApiProperty()
  readonly folioSolicitud: string;

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
  readonly percepcionMensual: string;

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
  @Length(18) 
  @ApiProperty()
  readonly representanteLegal: string;  

}