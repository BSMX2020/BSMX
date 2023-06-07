import { MigrationInterface, QueryRunner } from "typeorm";

export class BeneficiarioNulable1686163819958 implements MigrationInterface {
    name = 'BeneficiarioNulable1686163819958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beneficiario" ALTER COLUMN "foto" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "beneficiario" ALTER COLUMN "salo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beneficiario" ALTER COLUMN "salo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "beneficiario" ALTER COLUMN "foto" SET NOT NULL`);
    }

}
