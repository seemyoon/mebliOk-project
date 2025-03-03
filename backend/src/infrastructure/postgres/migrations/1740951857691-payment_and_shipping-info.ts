import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentAndShippingInfo1740951857691 implements MigrationInterface {
    name = 'PaymentAndShippingInfo1740951857691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_info" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text, CONSTRAINT "PK_b2ba4f3b3f40c6a37e54fb8b252" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping_info" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "photos" json, "description" text, "body" text, CONSTRAINT "PK_f81527a1b48d655ce69b6962a0e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shipping_info"`);
        await queryRunner.query(`DROP TABLE "payment_info"`);
    }

}
