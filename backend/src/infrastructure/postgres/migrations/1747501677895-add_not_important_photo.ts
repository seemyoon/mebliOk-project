import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotImportantPhoto1747501677895 implements MigrationInterface {
    name = 'AddNotImportantPhoto1747501677895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategory_furniture" ALTER COLUMN "photo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategory_furniture" ALTER COLUMN "photo" SET NOT NULL`);
    }

}
