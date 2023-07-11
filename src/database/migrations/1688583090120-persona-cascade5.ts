import { MigrationInterface, QueryRunner } from "typeorm";

export class PersonaCascade51688583090120 implements MigrationInterface {
    name = 'PersonaCascade51688583090120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "persona" DROP CONSTRAINT "FK_be1b6c93675d598a590c1b8f114"`);
        await queryRunner.query(`ALTER TABLE "persona" ADD CONSTRAINT "FK_be1b6c93675d598a590c1b8f114" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "persona" DROP CONSTRAINT "FK_be1b6c93675d598a590c1b8f114"`);
        await queryRunner.query(`ALTER TABLE "persona" ADD CONSTRAINT "FK_be1b6c93675d598a590c1b8f114" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
