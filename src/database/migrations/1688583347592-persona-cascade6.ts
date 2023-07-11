import { MigrationInterface, QueryRunner } from "typeorm";

export class PersonaCascade61688583347592 implements MigrationInterface {
    name = 'PersonaCascade61688583347592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "referencia" DROP CONSTRAINT "FK_3add3fdc080f59d4747741be743"`);
        await queryRunner.query(`ALTER TABLE "empresa" DROP CONSTRAINT "FK_b3153b406fe61288c26ab2a8154"`);
        await queryRunner.query(`ALTER TABLE "empresa" DROP CONSTRAINT "FK_75de98bb51c7085e2d717259ab2"`);
        await queryRunner.query(`ALTER TABLE "domicilio" DROP CONSTRAINT "FK_5956755d187198e34d708f6b8b9"`);
        await queryRunner.query(`ALTER TABLE "referencia" ADD CONSTRAINT "FK_3add3fdc080f59d4747741be743" FOREIGN KEY ("personaCurp") REFERENCES "persona"("curp") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresa" ADD CONSTRAINT "FK_b3153b406fe61288c26ab2a8154" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresa" ADD CONSTRAINT "FK_75de98bb51c7085e2d717259ab2" FOREIGN KEY ("representanteLegalCurp") REFERENCES "representante_legal"("curp") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "domicilio" ADD CONSTRAINT "FK_5956755d187198e34d708f6b8b9" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "domicilio" DROP CONSTRAINT "FK_5956755d187198e34d708f6b8b9"`);
        await queryRunner.query(`ALTER TABLE "empresa" DROP CONSTRAINT "FK_75de98bb51c7085e2d717259ab2"`);
        await queryRunner.query(`ALTER TABLE "empresa" DROP CONSTRAINT "FK_b3153b406fe61288c26ab2a8154"`);
        await queryRunner.query(`ALTER TABLE "referencia" DROP CONSTRAINT "FK_3add3fdc080f59d4747741be743"`);
        await queryRunner.query(`ALTER TABLE "domicilio" ADD CONSTRAINT "FK_5956755d187198e34d708f6b8b9" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresa" ADD CONSTRAINT "FK_75de98bb51c7085e2d717259ab2" FOREIGN KEY ("representanteLegalCurp") REFERENCES "representante_legal"("curp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresa" ADD CONSTRAINT "FK_b3153b406fe61288c26ab2a8154" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "referencia" ADD CONSTRAINT "FK_3add3fdc080f59d4747741be743" FOREIGN KEY ("personaCurp") REFERENCES "persona"("curp") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
