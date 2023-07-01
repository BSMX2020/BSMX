import { IsString, IsNotEmpty, IsEmail, Length, IsOptional, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBeneficiarioDto {  

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  readonly correo: string;

  @IsOptional()
  @IsString()  
  @ApiProperty()
  readonly foto: string;

  @IsOptional()
  @IsString()  
  @ApiProperty()
  readonly saldo: number;

}