import { IsString, IsNotEmpty, IsEmail, Length, IsOptional, IsPositive, isPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateDomicilioDto { 
  @IsString()
  @IsNotEmpty()    
  @ApiProperty()
  readonly calle: string;

  @IsString()
  @IsNotEmpty()    
  @ApiProperty()
  readonly colonia: string;

  @IsString()
  @IsNotEmpty()    
  @ApiProperty()
  readonly estado: string;

  @IsString()
  @IsNotEmpty()    
  @ApiProperty()
  readonly municipio: string;

  @IsString()
  @IsNotEmpty()    
  @ApiProperty()
  readonly localidad: string;

  @IsString()
  @IsNotEmpty()    
  @ApiProperty()
  readonly codigoPostal: string;

  @IsString()
  @IsNotEmpty()    
  @ApiProperty()
  readonly numeroExterior: string;

  @IsString()
  @IsNotEmpty()    
  @ApiProperty()
  readonly numeroInterior: string;  

}