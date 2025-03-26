import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1742938071159 implements MigrationInterface {
    name = 'AddBaseEntities1742938071159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "furniture" ADD "isSale" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "furniture" DROP COLUMN "isSale"`);
    }

}
