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
  saldo: number;

  @IsNotEmpty()  
  @IsPositive()
  @ApiProperty()
  readonly domicilio: number;

}

export class LogInBeneficiarioDto {  
  
  @IsNotEmpty() 
  @IsEmail() 
  @ApiProperty()  
  readonly correo: string;

  @IsNotEmpty()
  @IsString()  
  @ApiProperty()
  contrasenia: string; 

}