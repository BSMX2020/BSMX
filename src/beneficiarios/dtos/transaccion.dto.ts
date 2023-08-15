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

export class CreateTransaccionDto {     
  
  @IsOptional()
  @IsPositive()  
  @ApiProperty()
  readonly monto: number;

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly descripcion: string;

  @IsDateString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly fecha: Date;

  @IsNotEmpty()  
  @IsPositive()
  @ApiProperty()
  readonly beneficiarioEmisor: number;

  @IsNotEmpty()  
  @IsPositive()
  @ApiProperty()
  readonly beneficiarioReceptor: number;


}

export class CreateTransaccionCorreoDto {     
  
  @IsOptional()
  @IsPositive()  
  @ApiProperty()
  readonly monto: number;

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly descripcion: string;

  @IsNotEmpty() 
  @IsEmail({}, { message: 'El formato de correo electrónico es inválido' }) 
  @ApiProperty() 
  readonly correoBeneficiarioEmisor: string;

  @IsNotEmpty() 
  @IsEmail({}, { message: 'El formato de correo electrónico es inválido' }) 
  @ApiProperty() 
  readonly correoBeneficiarioReceptor: string;

}