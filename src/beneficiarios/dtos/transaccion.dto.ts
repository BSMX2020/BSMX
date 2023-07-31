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

  @IsNotEmpty()  
  @IsPositive()
  @ApiProperty()
  readonly beneficiarioEmisor: number;

  @IsNotEmpty()  
  @IsPositive()
  @ApiProperty()
  readonly beneficiarioReceptor: number;


}