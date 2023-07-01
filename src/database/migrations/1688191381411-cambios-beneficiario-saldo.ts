import { MigrationInterface, QueryRunner } from "typeorm";

export class CambiosBeneficiarioSaldo1688191381411 implements MigrationInterface {
    name = 'CambiosBeneficiarioSaldo1688191381411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beneficiario" RENAME COLUMN "salo" TO "saldo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beneficiario" RENAME COLUMN "saldo" TO "salo"`);
    }

}
