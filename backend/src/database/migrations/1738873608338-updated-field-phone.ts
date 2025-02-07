import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedFieldPhone1738873608338 implements MigrationInterface {
    name = 'UpdatedFieldPhone1738873608338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
    }

}
