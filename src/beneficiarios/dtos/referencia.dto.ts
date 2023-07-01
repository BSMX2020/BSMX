import { IsString, IsNotEmpty, IsEmail, Length, IsOptional, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateReferenciaDto {  

  @IsString()
  @IsNotEmpty() 
  @Length(255) 
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty() 
  @Length(10) 
  @ApiProperty()
  readonly telefono: string;

  

}