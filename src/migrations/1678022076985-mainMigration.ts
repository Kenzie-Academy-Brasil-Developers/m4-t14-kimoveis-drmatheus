import { MigrationInterface, QueryRunner } from "typeorm";

export class mainMigration1678022076985 implements MigrationInterface {
    name = 'mainMigration1678022076985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adresses" ("id" SERIAL NOT NULL, "street" character varying(45) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying(6), "city" character varying(20) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "password" character varying(120) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "realEstate" ("id" SERIAL NOT NULL, "sold" boolean NOT NULL DEFAULT false, "value" numeric(12,2) NOT NULL DEFAULT '0', "size" integer NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "addressId" integer, "categoryId" integer, CONSTRAINT "REL_8137b7f715382ad34dc87367d2" UNIQUE ("addressId"), CONSTRAINT "PK_3dda4b00f0afdfda35742b06969" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "realEstateId" integer, "userId" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "FK_8137b7f715382ad34dc87367d21" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "FK_66429ecade1b04f502b6e42c7a8" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_b080fc5367055bf9fbe4fe01448" FOREIGN KEY ("realEstateId") REFERENCES "realEstate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_d796103491cf0bae197dda59477" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_d796103491cf0bae197dda59477"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_b080fc5367055bf9fbe4fe01448"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "FK_66429ecade1b04f502b6e42c7a8"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "FK_8137b7f715382ad34dc87367d21"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "realEstate"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
    }

}
