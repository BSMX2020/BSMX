import { MigrationInterface, QueryRunner } from "typeorm";

export class LineasCredito1689710751159 implements MigrationInterface {
    name = 'LineasCredito1689710751159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "linea_credito" ("folio" character varying(255) NOT NULL, "fotoBaucher" character varying(255) NOT NULL, "fechaProxPago" date NOT NULL, "creditoOtorgado" integer, "montoProxPago" integer, "beneficiarioId" integer, CONSTRAINT "REL_453c0d026cb4309d452f8e989a" UNIQUE ("beneficiarioId"), CONSTRAINT "PK_40b01de4de83fbc7386c60a8c1f" PRIMARY KEY ("folio"))`);
        await queryRunner.query(`ALTER TABLE "linea_credito" ADD CONSTRAINT "FK_453c0d026cb4309d452f8e989a1" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linea_credito" DROP CONSTRAINT "FK_453c0d026cb4309d452f8e989a1"`);
        await queryRunner.query(`DROP TABLE "linea_credito"`);
    }

}
