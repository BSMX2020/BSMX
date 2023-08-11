import { 
  IsString,
  IsNotEmpty,
  IsEmail, 
  Length, 
  IsOptional, 
  IsPositive, 
  IsDateString, 
  Matches } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateEmpresaDatosDto {  

    // ---------------------------- Beneficiario 

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

    // ---------------------------- Empresa 
  
    @IsString()
    @IsNotEmpty()  
    @Matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, {
      message:
        'Formato de RFC inválido',
    })
    @ApiProperty()
    readonly rfc: string;  

    @IsString()
    @IsNotEmpty()   
    @ApiProperty()
    readonly ingresoMensual: string;

    @IsString()
    @IsNotEmpty()   
    @ApiProperty()
    readonly antiguedad: string;

    @IsString()
    @IsNotEmpty()   
    @ApiProperty()
    readonly tipoGiro: string;

    @IsString()
    @IsNotEmpty()   
    @ApiProperty()
    readonly gasto: string;

    @IsString()
    @IsNotEmpty()   
    @ApiProperty()
    readonly utilidad: string;

    @IsString()
    @IsNotEmpty()   
    @ApiProperty()
    readonly empresaTipo: string; 
  
    // ---------------------------- Domicilio

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly calle: string;

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly colonia: string;

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly estado: string;

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly municipio: string;

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly localidad: string;

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly codigoPostal: string;

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly numeroExterior: string;

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly numeroInterior: string;  

    // ---------------------------- RepresentanteLegal

    @IsString()
    @IsNotEmpty()  
    @Matches(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/, {
      message:
        'Formato de CURP inválido',
    })
    @ApiProperty()
    readonly curpRepresentanteLegal: string;

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly apellidoPaternoRepresentanteLegal: string;

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly apellidoMaternoRepresentanteLegal: string;

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly nombreRepresentanteLegal: string;

    @IsDateString()
    @IsNotEmpty()  
    @ApiProperty()
    readonly fechaNacimientoRepresentanteLegal: Date;

    @IsString()
    @IsNotEmpty()     
    @Matches(/^\d{10}$/, {
      message:
        'Formato de teléfono debe de ser de 10 dígitos',
    })
    @ApiProperty()
    readonly telefonoRepresentanteLegal: string;

    @IsString()
    @IsNotEmpty()    
    @ApiProperty()
    readonly tipoAcreditacionRepresentanteLegal: string;

  
  }