import { MigrationInterface, QueryRunner } from "typeorm";

export class TransaccionesFecha1689653032073 implements MigrationInterface {
    name = 'TransaccionesFecha1689653032073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaccion" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD "fecha" date NOT NULL DEFAULT ('now'::text)::date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaccion" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD "fecha" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
