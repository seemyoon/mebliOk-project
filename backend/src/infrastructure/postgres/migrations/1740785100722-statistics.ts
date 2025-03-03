import { MigrationInterface, QueryRunner } from "typeorm";

export class Statistics1740785100722 implements MigrationInterface {
    name = 'Statistics1740785100722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "furniture_statistic" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "count_views" integer NOT NULL, "furniture_id" uuid NOT NULL, CONSTRAINT "REL_cfa9e80f3a56bf1e9a8dc13b7f" UNIQUE ("furniture_id"), CONSTRAINT "PK_1d853604138b1587c5f58f8d673" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "calculate_rate_furniture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_criterion" integer NOT NULL DEFAULT '70', "view_criterion" integer NOT NULL DEFAULT '30', CONSTRAINT "PK_c9e58eeea5250cab8713f76feac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "furniture_statistic" ADD CONSTRAINT "FK_cfa9e80f3a56bf1e9a8dc13b7fc" FOREIGN KEY ("furniture_id") REFERENCES "furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "furniture_statistic" DROP CONSTRAINT "FK_cfa9e80f3a56bf1e9a8dc13b7fc"`);
        await queryRunner.query(`DROP TABLE "calculate_rate_furniture"`);
        await queryRunner.query(`DROP TABLE "furniture_statistic"`);
    }

}
