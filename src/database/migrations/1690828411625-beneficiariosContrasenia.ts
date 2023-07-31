import { MigrationInterface, QueryRunner } from "typeorm";

export class BeneficiariosContrasenia1690828411625 implements MigrationInterface {
    name = 'BeneficiariosContrasenia1690828411625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beneficiario" ADD "contrasenia" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beneficiario" DROP COLUMN "contrasenia"`);
    }

}
