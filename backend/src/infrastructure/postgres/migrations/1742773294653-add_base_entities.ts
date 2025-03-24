import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1742773294653 implements MigrationInterface {
    name = 'AddBaseEntities1742773294653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "delivery" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deliveryPlace" text NOT NULL, "address" text NOT NULL, "comment" text, "order_id" integer NOT NULL, CONSTRAINT "REL_08f144cd9889759426ab37c358" UNIQUE ("order_id"), CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_shippingmethod_enum" AS ENUM('delivery', 'self-pickup', 'nova-post')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "shippingMethod" "public"."order_shippingmethod_enum"`);
        await queryRunner.query(`ALTER TABLE "delivery" ADD CONSTRAINT "FK_08f144cd9889759426ab37c358e" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery" DROP CONSTRAINT "FK_08f144cd9889759426ab37c358e"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "shippingMethod"`);
        await queryRunner.query(`DROP TYPE "public"."order_shippingmethod_enum"`);
        await queryRunner.query(`DROP TABLE "delivery"`);
    }

}
