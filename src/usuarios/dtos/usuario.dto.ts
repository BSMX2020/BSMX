import { IsString, IsNotEmpty, IsEmail, Length, IsOptional, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {  

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly correo: string;

  @IsOptional()
  @IsString()  
  @ApiProperty()
  readonly contrasenia: string; 

}