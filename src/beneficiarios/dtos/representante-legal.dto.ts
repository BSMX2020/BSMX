import { IsString, IsNotEmpty, IsEmail, Length, IsOptional, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateRepresentanteLegalDto { 

  @IsString()
  @IsNotEmpty() 
  @Length(18) 
  @ApiProperty()
  readonly curp: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly apellidoPaterno: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly apellidoMaterno: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly fechaNacimiento: Date;

  @IsString()
  @IsNotEmpty()  
  @Length(10) 
  @ApiProperty()
  readonly telefono: string;

  @IsString()
  @IsNotEmpty()  
  @Length(255) 
  @ApiProperty()
  readonly tipoAcreditacion: string;

}