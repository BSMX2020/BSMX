import { MigrationInterface, QueryRunner } from "typeorm";

export class Beneficiario1686162966377 implements MigrationInterface {
    name = 'Beneficiario1686162966377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "beneficiario" ("id" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "correo" character varying(255) NOT NULL, "foto" character varying(255) NOT NULL, "salo" integer NOT NULL, CONSTRAINT "PK_9e84e9c9d884399c3ad68d51c8b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "beneficiario"`);
    }

}
