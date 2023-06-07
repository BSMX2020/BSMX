import { MigrationInterface, QueryRunner } from "typeorm";

export class Usuarios1686172846981 implements MigrationInterface {
    name = 'Usuarios1686172846981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "correo" character varying(255) NOT NULL, "contrasenia" character varying(255) NOT NULL, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
