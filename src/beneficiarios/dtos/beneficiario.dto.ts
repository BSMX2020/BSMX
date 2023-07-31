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

export class CreateBeneficiarioDto {    

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty() 
  @IsEmail() 
  @ApiProperty()  
  readonly correo: string;

  @IsNotEmpty()
  @IsString()  
  @ApiProperty()
  contrasenia: string; 

  @IsOptional()
  @IsString()  
  @ApiProperty()
  readonly foto: string;

  @IsOptional()
  @IsPositive()  
  @ApiProperty()
  readonly saldo: number;

  @IsNotEmpty()  
  @IsPositive()
  @ApiProperty()
  readonly domicilio: number;

}