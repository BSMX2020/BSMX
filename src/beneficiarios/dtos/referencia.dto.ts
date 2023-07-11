import { IsString, IsNotEmpty, IsEmail, Length, IsOptional, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateReferenciaDto {  

  @IsString()
  @IsNotEmpty()   
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty() 
  @Length(10) 
  @ApiProperty()
  readonly telefono: string;

  @IsString()
  @IsNotEmpty() 
  @Length(18) 
  @ApiProperty()
  readonly persona: string;  

}