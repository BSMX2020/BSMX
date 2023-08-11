import { MigrationInterface, QueryRunner } from "typeorm";

export class EmpresaPercepcionMensual1691716864183 implements MigrationInterface {
    name = 'EmpresaPercepcionMensual1691716864183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresa" DROP COLUMN "percepcionMensual"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresa" ADD "percepcionMensual" character varying(255) NOT NULL`);
    }

}
