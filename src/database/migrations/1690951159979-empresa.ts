import { MigrationInterface, QueryRunner } from "typeorm";

export class Empresa1690951159979 implements MigrationInterface {
    name = 'Empresa1690951159979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresa" DROP COLUMN "folioSolicitud"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresa" ADD "folioSolicitud" character varying(255) NOT NULL`);
    }

}
