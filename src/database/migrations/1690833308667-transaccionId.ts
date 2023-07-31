import { MigrationInterface, QueryRunner } from "typeorm";

export class TransaccionId1690833308667 implements MigrationInterface {
    name = 'TransaccionId1690833308667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaccion" RENAME COLUMN "folio" TO "id"`);
        await queryRunner.query(`ALTER TABLE "transaccion" RENAME CONSTRAINT "PK_3c578704c841d9204c5f8c24b1f" TO "PK_1d7fb1e642fb44d52a2fce77fc6"`);
        await queryRunner.query(`ALTER TABLE "transaccion" DROP CONSTRAINT "PK_1d7fb1e642fb44d52a2fce77fc6"`);
        await queryRunner.query(`ALTER TABLE "transaccion" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD CONSTRAINT "PK_1d7fb1e642fb44d52a2fce77fc6" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaccion" DROP CONSTRAINT "PK_1d7fb1e642fb44d52a2fce77fc6"`);
        await queryRunner.query(`ALTER TABLE "transaccion" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD "id" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD CONSTRAINT "PK_1d7fb1e642fb44d52a2fce77fc6" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "transaccion" RENAME CONSTRAINT "PK_1d7fb1e642fb44d52a2fce77fc6" TO "PK_3c578704c841d9204c5f8c24b1f"`);
        await queryRunner.query(`ALTER TABLE "transaccion" RENAME COLUMN "id" TO "folio"`);
    }

}
