import { MigrationInterface, QueryRunner } from "typeorm";

export class fixLengthNumberToSeven1678121190913 implements MigrationInterface {
    name = 'fixLengthNumberToSeven1678121190913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "number" character varying(7)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "number" character varying(6)`);
    }

}
