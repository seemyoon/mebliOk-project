import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1743006011244 implements MigrationInterface {
    name = 'AddBaseEntities1743006011244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "email" text`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_3d73ccc46a25e9d02806a5b6d07" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "order" ADD "phoneNumber" text`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_3b61090c22db7a33896e24cc3a5" UNIQUE ("phoneNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_3b61090c22db7a33896e24cc3a5"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_3d73ccc46a25e9d02806a5b6d07"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "email"`);
    }

}
