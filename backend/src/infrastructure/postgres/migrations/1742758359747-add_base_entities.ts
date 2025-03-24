import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1742758359747 implements MigrationInterface {
    name = 'AddBaseEntities1742758359747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "is_show_price" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isShowPrice" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_ed687f182052b611669e2f4d68c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "is_show_price"`);
    }

}
