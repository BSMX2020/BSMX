import { IsString, IsNotEmpty, IsEmail, Length, IsOptional, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateDomicilioDto { 
  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly calle: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly colonia: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly estado: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly municipio: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly localidad: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly codigoPostal: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly numeroExterior: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly numeroInterior: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly idBeneficiario: string;  

}