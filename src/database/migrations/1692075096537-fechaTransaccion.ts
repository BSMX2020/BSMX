import { MigrationInterface, QueryRunner } from "typeorm";

export class FechaTransaccion1692075096537 implements MigrationInterface {
    name = 'FechaTransaccion1692075096537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaccion" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD "fecha" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaccion" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD "fecha" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
