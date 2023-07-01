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
  @Length(255) 
  @ApiProperty()
  readonly folioSolicitud: string;

  @IsString()
  @IsNotEmpty() 
  @Length(255) 
  @ApiProperty()
  readonly ingresoMensual: string;

  @IsString()
  @IsNotEmpty() 
  @Length(255) 
  @ApiProperty()
  readonly antiguedad: string;

  @IsString()
  @IsNotEmpty() 
  @Length(255) 
  @ApiProperty()
  readonly tipoGiro: string;

  @IsString()
  @IsNotEmpty() 
  @Length(255) 
  @ApiProperty()
  readonly gasto: string;

  @IsString()
  @IsNotEmpty() 
  @Length(255) 
  @ApiProperty()
  readonly percepcionMensual: string;

  @IsString()
  @IsNotEmpty() 
  @Length(255) 
  @ApiProperty()
  readonly utilidad: string;

  @IsString()
  @IsNotEmpty() 
  @Length(255) 
  @ApiProperty()
  readonly empresaTipo: string;

  @IsString()
  @IsNotEmpty()   
  @ApiProperty()
  readonly idBeneficiario: number;

  @IsString()
  @IsNotEmpty() 
  @Length(18) 
  @ApiProperty()
  readonly curpRepresentanteLegal: string;  

}