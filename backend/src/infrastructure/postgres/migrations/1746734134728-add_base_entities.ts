import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1746734134728 implements MigrationInterface {
    name = 'AddBaseEntities1746734134728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_furniture" ALTER COLUMN "photo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_furniture" ALTER COLUMN "photo" SET NOT NULL`);
    }

}
