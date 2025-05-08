import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1746729194309 implements MigrationInterface {
    name = 'AddBaseEntities1746729194309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategory_furniture" ADD "photo" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category_furniture" ADD "photo" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isVerified" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "category_furniture" DROP COLUMN "photo"`);
        await queryRunner.query(`ALTER TABLE "subcategory_furniture" DROP COLUMN "photo"`);
    }

}
