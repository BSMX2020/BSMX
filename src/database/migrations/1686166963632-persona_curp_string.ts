import { MigrationInterface, QueryRunner } from "typeorm";

export class PersonaCurpString1686166963632 implements MigrationInterface {
    name = 'PersonaCurpString1686166963632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "persona" DROP CONSTRAINT "PK_b60e4855b3364b1556ed81c780c"`);
        await queryRunner.query(`ALTER TABLE "persona" DROP COLUMN "curp"`);
        await queryRunner.query(`ALTER TABLE "persona" ADD "curp" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "persona" ADD CONSTRAINT "PK_b60e4855b3364b1556ed81c780c" PRIMARY KEY ("curp")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "persona" DROP CONSTRAINT "PK_b60e4855b3364b1556ed81c780c"`);
        await queryRunner.query(`ALTER TABLE "persona" DROP COLUMN "curp"`);
        await queryRunner.query(`ALTER TABLE "persona" ADD "curp" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "persona" ADD CONSTRAINT "PK_b60e4855b3364b1556ed81c780c" PRIMARY KEY ("curp")`);
    }

}
