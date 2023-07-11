import { IsString, IsNotEmpty, IsEmail, Length, IsOptional, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePersonaDto {  

  @IsString()
  @IsNotEmpty()  
  @Length(18) 
  @ApiProperty()
  readonly curp: string;

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly apellidoPaterno: string;

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly apellidoMaterno: string;

  @IsString()
  @IsNotEmpty()  
  @Length(10) 
  @ApiProperty()
  readonly telefono: string;

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
  readonly fechaNacimiento: string;

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly ocupacion: string;

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly localidad: string;

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly percepcionMensual: string;  

  @IsNotEmpty()  
  @IsPositive()
  @ApiProperty()
  readonly beneficiario: number;  

}