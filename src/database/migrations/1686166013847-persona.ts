import { MigrationInterface, QueryRunner } from "typeorm";

export class Persona1686166013847 implements MigrationInterface {
    name = 'Persona1686166013847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "persona" ("curp" SERIAL NOT NULL, "apellidoPaterno" character varying(255) NOT NULL, "apellidoMaterno" character varying(255) NOT NULL, "telefono" character varying(255) NOT NULL, "estado" character varying(255) NOT NULL, "municipio" character varying(255) NOT NULL, "fechaNacimiento" character varying(255) NOT NULL, "ocupacion" character varying(255) NOT NULL, "localidad" character varying(255) NOT NULL, "percepcionMensual" character varying(255) NOT NULL, "beneficiarioId" integer, CONSTRAINT "REL_be1b6c93675d598a590c1b8f11" UNIQUE ("beneficiarioId"), CONSTRAINT "PK_b60e4855b3364b1556ed81c780c" PRIMARY KEY ("curp"))`);
        await queryRunner.query(`ALTER TABLE "persona" ADD CONSTRAINT "FK_be1b6c93675d598a590c1b8f114" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "persona" DROP CONSTRAINT "FK_be1b6c93675d598a590c1b8f114"`);
        await queryRunner.query(`DROP TABLE "persona"`);
    }

}
