import { MigrationInterface, QueryRunner } from "typeorm";

export class TransaccionFecha1692065814131 implements MigrationInterface {
    name = 'TransaccionFecha1692065814131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaccion" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD "fecha" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaccion" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD "fecha" date NOT NULL DEFAULT ('now'::text)::date`);
    }

}
