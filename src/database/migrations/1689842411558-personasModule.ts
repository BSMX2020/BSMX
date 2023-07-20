import { MigrationInterface, QueryRunner } from "typeorm";

export class PersonasModule1689842411558 implements MigrationInterface {
    name = 'PersonasModule1689842411558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "referencia" ("id" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "telefono" character varying(10) NOT NULL, "personaCurp" character varying(18), CONSTRAINT "PK_4a1d4b427fe6c68500a76e5b65a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requisitos_persona" ("id" SERIAL NOT NULL, "fotoCasa" character varying(255) NOT NULL, "rfc" character varying(255) NOT NULL, "reciboPagoSolicitud" character varying(255) NOT NULL, "ine" character varying(255) NOT NULL, "curp" character varying(255) NOT NULL, "comprobanteIngresos" character varying(255) NOT NULL, "comprobanteDomicilio" character varying(255) NOT NULL, "personaCurp" character varying(18), CONSTRAINT "REL_8eaea6bbdbc01e1c578f1e71a1" UNIQUE ("personaCurp"), CONSTRAINT "PK_a11120422dc86f2e5336384ec2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "persona" ("curp" character varying(18) NOT NULL, "apellidoPaterno" character varying(255) NOT NULL, "apellidoMaterno" character varying(255) NOT NULL, "telefono" character varying(10) NOT NULL, "estado" character varying(255) NOT NULL, "municipio" character varying(255) NOT NULL, "fechaNacimiento" date NOT NULL, "ocupacion" character varying(255) NOT NULL, "localidad" character varying(255) NOT NULL, "percepcionMensual" character varying(255) NOT NULL, "beneficiarioId" integer, CONSTRAINT "REL_be1b6c93675d598a590c1b8f11" UNIQUE ("beneficiarioId"), CONSTRAINT "PK_b60e4855b3364b1556ed81c780c" PRIMARY KEY ("curp"))`);
        await queryRunner.query(`CREATE TABLE "representante_legal" ("curp" character varying(18) NOT NULL, "apellidoPaterno" character varying(255) NOT NULL, "apellidoMaterno" character varying(255) NOT NULL, "nombre" character varying(255) NOT NULL, "fechaNacimiento" date NOT NULL, "telefono" character varying(10) NOT NULL, "tipoAcreditacion" character varying(255) NOT NULL, CONSTRAINT "PK_846629b3bf99b0f68e76383152c" PRIMARY KEY ("curp"))`);
        await queryRunner.query(`CREATE TABLE "requisitos_empresa" ("id" SERIAL NOT NULL, "reciboPagoSolicitud" character varying(255) NOT NULL, "ine" character varying(255) NOT NULL, "fotoCaraIne" character varying(255) NOT NULL, "fotoMercancia" character varying(255) NOT NULL, "fotoExteriorNegocio" character varying(255) NOT NULL, "fotoInteriorNegocio" character varying(255) NOT NULL, "curp" character varying(255) NOT NULL, "comprobanteDomicilio" character varying(255) NOT NULL, "comprobanteIngresos" character varying(255) NOT NULL, "acreditacionJuridica" character varying(255) NOT NULL, "rfc" character varying(255) NOT NULL, "empresaRfc" character varying(13), CONSTRAINT "REL_8d330f39149980ef73898c33e0" UNIQUE ("empresaRfc"), CONSTRAINT "PK_4957da1d7599161f1667eda11d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "empresa" ("rfc" character varying(13) NOT NULL, "folioSolicitud" character varying(255) NOT NULL, "ingresoMensual" character varying(255) NOT NULL, "antiguedad" character varying(255) NOT NULL, "tipoGiro" character varying(255) NOT NULL, "gasto" character varying(255) NOT NULL, "percepcionMensual" character varying(255) NOT NULL, "utilidad" character varying(255) NOT NULL, "empresaTipo" character varying(255) NOT NULL, "beneficiarioId" integer, "representanteLegalCurp" character varying(18), CONSTRAINT "REL_b3153b406fe61288c26ab2a815" UNIQUE ("beneficiarioId"), CONSTRAINT "PK_050fffc050c015802aced7e33cd" PRIMARY KEY ("rfc"))`);
        await queryRunner.query(`CREATE TABLE "transaccion" ("folio" character varying(255) NOT NULL, "monto" integer NOT NULL, "fecha" date NOT NULL DEFAULT ('now'::text)::date, "beneficiarioEmisorId" integer, "beneficiarioReceptorId" integer, CONSTRAINT "PK_3c578704c841d9204c5f8c24b1f" PRIMARY KEY ("folio"))`);
        await queryRunner.query(`CREATE TABLE "linea_credito" ("folio" character varying(255) NOT NULL, "fotoBaucher" character varying(255) NOT NULL, "fechaProxPago" date NOT NULL, "creditoOtorgado" integer, "montoProxPago" integer, "beneficiarioId" integer, CONSTRAINT "REL_453c0d026cb4309d452f8e989a" UNIQUE ("beneficiarioId"), CONSTRAINT "PK_40b01de4de83fbc7386c60a8c1f" PRIMARY KEY ("folio"))`);
        await queryRunner.query(`CREATE TABLE "beneficiario" ("id" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "correo" character varying(255) NOT NULL, "foto" character varying(255), "saldo" integer, "domicilioId" integer, CONSTRAINT "PK_9e84e9c9d884399c3ad68d51c8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "domicilio" ("id" SERIAL NOT NULL, "calle" character varying(255) NOT NULL, "colonia" character varying(255) NOT NULL, "estado" character varying(255) NOT NULL, "municipio" character varying(255) NOT NULL, "localidad" character varying(255) NOT NULL, "codigoPostal" character varying(255) NOT NULL, "numeroExterior" character varying(255) NOT NULL, "numeroInterior" character varying(255) NOT NULL, CONSTRAINT "PK_e0f4488f333668f8c221e2c10a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "REL_6c687a8fa35b0ae35ce766b56c" UNIQUE ("customerId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "phone" character varying(10) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "image" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "correo" character varying(255) NOT NULL, "contrasenia" character varying(255) NOT NULL, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "referencia" ADD CONSTRAINT "FK_3add3fdc080f59d4747741be743" FOREIGN KEY ("personaCurp") REFERENCES "persona"("curp") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requisitos_persona" ADD CONSTRAINT "FK_8eaea6bbdbc01e1c578f1e71a11" FOREIGN KEY ("personaCurp") REFERENCES "persona"("curp") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "persona" ADD CONSTRAINT "FK_be1b6c93675d598a590c1b8f114" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requisitos_empresa" ADD CONSTRAINT "FK_8d330f39149980ef73898c33e0f" FOREIGN KEY ("empresaRfc") REFERENCES "empresa"("rfc") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresa" ADD CONSTRAINT "FK_b3153b406fe61288c26ab2a8154" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresa" ADD CONSTRAINT "FK_75de98bb51c7085e2d717259ab2" FOREIGN KEY ("representanteLegalCurp") REFERENCES "representante_legal"("curp") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD CONSTRAINT "FK_dbb3c850cebf192629d30a608eb" FOREIGN KEY ("beneficiarioEmisorId") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD CONSTRAINT "FK_45077532e0b89b7e397e444e178" FOREIGN KEY ("beneficiarioReceptorId") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "linea_credito" ADD CONSTRAINT "FK_453c0d026cb4309d452f8e989a1" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beneficiario" ADD CONSTRAINT "FK_b501c575c79aa2abdc281847a02" FOREIGN KEY ("domicilioId") REFERENCES "domicilio"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`ALTER TABLE "beneficiario" DROP CONSTRAINT "FK_b501c575c79aa2abdc281847a02"`);
        await queryRunner.query(`ALTER TABLE "linea_credito" DROP CONSTRAINT "FK_453c0d026cb4309d452f8e989a1"`);
        await queryRunner.query(`ALTER TABLE "transaccion" DROP CONSTRAINT "FK_45077532e0b89b7e397e444e178"`);
        await queryRunner.query(`ALTER TABLE "transaccion" DROP CONSTRAINT "FK_dbb3c850cebf192629d30a608eb"`);
        await queryRunner.query(`ALTER TABLE "empresa" DROP CONSTRAINT "FK_75de98bb51c7085e2d717259ab2"`);
        await queryRunner.query(`ALTER TABLE "empresa" DROP CONSTRAINT "FK_b3153b406fe61288c26ab2a8154"`);
        await queryRunner.query(`ALTER TABLE "requisitos_empresa" DROP CONSTRAINT "FK_8d330f39149980ef73898c33e0f"`);
        await queryRunner.query(`ALTER TABLE "persona" DROP CONSTRAINT "FK_be1b6c93675d598a590c1b8f114"`);
        await queryRunner.query(`ALTER TABLE "requisitos_persona" DROP CONSTRAINT "FK_8eaea6bbdbc01e1c578f1e71a11"`);
        await queryRunner.query(`ALTER TABLE "referencia" DROP CONSTRAINT "FK_3add3fdc080f59d4747741be743"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "domicilio"`);
        await queryRunner.query(`DROP TABLE "beneficiario"`);
        await queryRunner.query(`DROP TABLE "linea_credito"`);
        await queryRunner.query(`DROP TABLE "transaccion"`);
        await queryRunner.query(`DROP TABLE "empresa"`);
        await queryRunner.query(`DROP TABLE "requisitos_empresa"`);
        await queryRunner.query(`DROP TABLE "representante_legal"`);
        await queryRunner.query(`DROP TABLE "persona"`);
        await queryRunner.query(`DROP TABLE "requisitos_persona"`);
        await queryRunner.query(`DROP TABLE "referencia"`);
    }

}
