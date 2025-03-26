import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1742947273936 implements MigrationInterface {
    name = 'AddBaseEntities1742947273936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favourite_furniture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "furniture_id" uuid, "user_id" uuid, CONSTRAINT "REL_53da068c2afa9c4a9970bd2d79" UNIQUE ("furniture_id"), CONSTRAINT "PK_9b25d1f181382660ba37f3f5038" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favourite_furniture" ADD CONSTRAINT "FK_53da068c2afa9c4a9970bd2d793" FOREIGN KEY ("furniture_id") REFERENCES "furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favourite_furniture" ADD CONSTRAINT "FK_1e2cf66da9f49fa1b2b0dbfb891" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourite_furniture" DROP CONSTRAINT "FK_1e2cf66da9f49fa1b2b0dbfb891"`);
        await queryRunner.query(`ALTER TABLE "favourite_furniture" DROP CONSTRAINT "FK_53da068c2afa9c4a9970bd2d793"`);
        await queryRunner.query(`DROP TABLE "favourite_furniture"`);
    }

}
