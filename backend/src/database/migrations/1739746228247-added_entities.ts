import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntities1739746228247 implements MigrationInterface {
    name = 'AddedEntities1739746228247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brand" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand_name" text NOT NULL, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "size" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "height" text NOT NULL, "width" text NOT NULL, "length" text NOT NULL, "deleted" TIMESTAMP, "furniture_id" character varying NOT NULL, "article_id" uuid, CONSTRAINT "REL_7fe9145eb4f098fc9bee3be6ec" UNIQUE ("article_id"), CONSTRAINT "PK_66e3a0111d969aa0e5f73855c7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'MANAGER', 'REGISTERED_CLIENT', 'UNREGISTERED_CLIENT', 'EXTERNAL_SELLER')`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text, "name" text, "phoneNumber" text, "avatar" text, "password" text, "deleted" TIMESTAMP, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "isReady" boolean NOT NULL DEFAULT false, "deleted" TIMESTAMP, "user_id" uuid NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_furniture" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_id" integer NOT NULL, "furniture_id" uuid NOT NULL, "quantity" numeric NOT NULL, CONSTRAINT "PK_b20f24996e19bf08e6a8549a0d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."furniture_sellertype_enum" AS ENUM('SELLER', 'EXTERNAL_SELLER')`);
        await queryRunner.query(`CREATE TABLE "furniture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "photos" json NOT NULL DEFAULT '[]', "name" text NOT NULL, "description" text NOT NULL, "body" text NOT NULL, "sellerType" "public"."furniture_sellertype_enum", "price" integer NOT NULL DEFAULT '0', "materials" json NOT NULL DEFAULT '[]', "color" json NOT NULL DEFAULT '[]', "weight" integer NOT NULL DEFAULT '0', "in_stock" boolean NOT NULL DEFAULT false, "discount" integer, "deleted" TIMESTAMP, "brand_id" uuid NOT NULL, "category_id" uuid NOT NULL, "subcategory_id" uuid, "sizeId" uuid, CONSTRAINT "REL_c05134e067457847faa1efdc60" UNIQUE ("sizeId"), CONSTRAINT "PK_9dd4efe60df9de0ba0e443c2d33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_furniture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "deleted" TIMESTAMP, CONSTRAINT "PK_077c175fcccd9645f0617d81418" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcategory_furniture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "deleted" TIMESTAMP, "category_id" uuid NOT NULL, CONSTRAINT "PK_aa56ea0c7a5838fc061a42e641b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "size" ADD CONSTRAINT "FK_7fe9145eb4f098fc9bee3be6eca" FOREIGN KEY ("article_id") REFERENCES "furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_furniture" ADD CONSTRAINT "FK_6b1b0e28688228c4b00ece4c680" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_furniture" ADD CONSTRAINT "FK_ce5a044128e4fd8b82cb01a0632" FOREIGN KEY ("furniture_id") REFERENCES "furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_c05134e067457847faa1efdc601" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_9400883e54a9fac9be73db30733" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_56522900ffce4cb91586981d5ac" FOREIGN KEY ("category_id") REFERENCES "category_furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_36310bdcb8464675491dbc3f4e4" FOREIGN KEY ("subcategory_id") REFERENCES "subcategory_furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcategory_furniture" ADD CONSTRAINT "FK_7ef279f3ba828d68961652a4266" FOREIGN KEY ("category_id") REFERENCES "category_furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategory_furniture" DROP CONSTRAINT "FK_7ef279f3ba828d68961652a4266"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_36310bdcb8464675491dbc3f4e4"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_56522900ffce4cb91586981d5ac"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_9400883e54a9fac9be73db30733"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_c05134e067457847faa1efdc601"`);
        await queryRunner.query(`ALTER TABLE "order_furniture" DROP CONSTRAINT "FK_ce5a044128e4fd8b82cb01a0632"`);
        await queryRunner.query(`ALTER TABLE "order_furniture" DROP CONSTRAINT "FK_6b1b0e28688228c4b00ece4c680"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "size" DROP CONSTRAINT "FK_7fe9145eb4f098fc9bee3be6eca"`);
        await queryRunner.query(`DROP TABLE "subcategory_furniture"`);
        await queryRunner.query(`DROP TABLE "category_furniture"`);
        await queryRunner.query(`DROP TABLE "furniture"`);
        await queryRunner.query(`DROP TYPE "public"."furniture_sellertype_enum"`);
        await queryRunner.query(`DROP TABLE "order_furniture"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "size"`);
        await queryRunner.query(`DROP TABLE "brand"`);
    }

}
