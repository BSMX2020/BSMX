import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsPositive,
  IsDateString,
  Matches
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLineaCreditoDto {

  @IsString()
  @IsNotEmpty()  
  @ApiProperty()
  folio: string;

  @IsString()
  @IsOptional()  
  @ApiProperty()
  fotoBaucher: string;

  @IsDateString()
  @IsNotEmpty()  
  @ApiProperty()
  fechaProxPago: Date;

  @IsNotEmpty()  
  @IsPositive()
  @ApiProperty()
  creditoOtorgado: number;

  @IsNotEmpty()  
  @IsPositive()
  @ApiProperty()
  montoProxPago: number;

  @IsNotEmpty()  
  @IsPositive()
  @ApiProperty()
  beneficiario: number;

}