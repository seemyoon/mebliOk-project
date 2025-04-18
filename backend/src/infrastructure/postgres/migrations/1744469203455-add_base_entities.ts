import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1744469203455 implements MigrationInterface {
    name = 'AddBaseEntities1744469203455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brand" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand_name" text NOT NULL, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcategory_furniture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "deleted" TIMESTAMP, "category_id" uuid NOT NULL, CONSTRAINT "PK_aa56ea0c7a5838fc061a42e641b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_furniture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "deleted" TIMESTAMP, CONSTRAINT "PK_077c175fcccd9645f0617d81418" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "color" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "color_name" text NOT NULL, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deliveryPlace" text NOT NULL, "address" text NOT NULL, "comment" text, "order_id" integer NOT NULL, CONSTRAINT "REL_08f144cd9889759426ab37c358" UNIQUE ("order_id"), CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quantity_furniture_in_order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_id" integer NOT NULL, "furniture_id" uuid NOT NULL, "quantity" numeric NOT NULL, CONSTRAINT "PK_009605d15a1209b758c4bf7a743" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_shippingmethod_enum" AS ENUM('DELIVERY', 'SELF_PICKUP', 'NOVA_POST')`);
        await queryRunner.query(`CREATE TABLE "order" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "isReady" boolean NOT NULL DEFAULT false, "deleted" TIMESTAMP, "orderEmail" text, "orderPhoneNumber" text, "shippingMethod" "public"."order_shippingmethod_enum", "user_id" uuid NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" text NOT NULL, "deviceId" text, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'MANAGER', 'REGISTERED_CLIENT', 'UNREGISTERED_CLIENT', 'EXTERNAL_SELLER')`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text, "name" text, "phoneNumber" text, "avatar" text, "password" text, "deleted" TIMESTAMP, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favourite_furniture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "furniture_id" uuid, "user_id" uuid, CONSTRAINT "REL_53da068c2afa9c4a9970bd2d79" UNIQUE ("furniture_id"), CONSTRAINT "PK_9b25d1f181382660ba37f3f5038" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "furniture_statistic" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "count_views" integer NOT NULL, "furniture_id" uuid NOT NULL, CONSTRAINT "REL_cfa9e80f3a56bf1e9a8dc13b7f" UNIQUE ("furniture_id"), CONSTRAINT "PK_1d853604138b1587c5f58f8d673" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "material" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "material_name" text NOT NULL, CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."furniture_sellertype_enum" AS ENUM('SELLER', 'EXTERNAL_SELLER')`);
        await queryRunner.query(`CREATE TYPE "public"."furniture_currency_enum" AS ENUM('USD', 'EUR', 'UAH')`);
        await queryRunner.query(`CREATE TABLE "furniture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "photos" json, "description" text, "isSale" boolean NOT NULL DEFAULT false, "body" text, "sellerType" "public"."furniture_sellertype_enum", "price" integer NOT NULL, "currency" "public"."furniture_currency_enum" NOT NULL DEFAULT 'UAH', "weight" text DEFAULT '0', "in_stock" boolean NOT NULL DEFAULT true, "discount" integer DEFAULT '0', "deleted" TIMESTAMP, "size_id" uuid NOT NULL, "brand_id" uuid NOT NULL, "category_id" uuid NOT NULL, "subcategory_id" uuid, CONSTRAINT "REL_b84ead66a803f885b2a6359319" UNIQUE ("size_id"), CONSTRAINT "PK_9dd4efe60df9de0ba0e443c2d33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "size" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "height" integer NOT NULL, "width" integer NOT NULL, "length" integer NOT NULL, "deleted" TIMESTAMP, "furnitureId" uuid, CONSTRAINT "REL_4e6c91a3fff794bd65054b4943" UNIQUE ("furnitureId"), CONSTRAINT "PK_66e3a0111d969aa0e5f73855c7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping_info" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "photos" json, "description" text, "body" text, CONSTRAINT "PK_f81527a1b48d655ce69b6962a0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_info" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text, CONSTRAINT "PK_b2ba4f3b3f40c6a37e54fb8b252" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "is_show_price" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isShowPrice" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_ed687f182052b611669e2f4d68c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_info" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text, "phoneNumber" text, "avatar" text, CONSTRAINT "UQ_9877ead65e48a32c072614863a8" UNIQUE ("phoneNumber"), CONSTRAINT "PK_0db6d2761bf28d6233c20a16c61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banner" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "photo" text, CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "calculate_rate_furniture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_criterion" integer NOT NULL DEFAULT '70', "view_criterion" integer NOT NULL DEFAULT '30', CONSTRAINT "PK_c9e58eeea5250cab8713f76feac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "furniture_color" ("furniture_id" uuid NOT NULL, "color_id" uuid NOT NULL, CONSTRAINT "PK_3f636dac98d1f7eb16fac8bd211" PRIMARY KEY ("furniture_id", "color_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2b35308ed60eae0452d0e852e5" ON "furniture_color" ("furniture_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ee72a03c7a5e9bec2ac6410ac6" ON "furniture_color" ("color_id") `);
        await queryRunner.query(`CREATE TABLE "furniture_material" ("furniture_id" uuid NOT NULL, "material_id" uuid NOT NULL, CONSTRAINT "PK_585c85719f9b81fde022e2e95bc" PRIMARY KEY ("furniture_id", "material_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99de947ae283250a9295f71266" ON "furniture_material" ("furniture_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_71df08a7020dcbab0535118c4a" ON "furniture_material" ("material_id") `);
        await queryRunner.query(`ALTER TABLE "subcategory_furniture" ADD CONSTRAINT "FK_7ef279f3ba828d68961652a4266" FOREIGN KEY ("category_id") REFERENCES "category_furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery" ADD CONSTRAINT "FK_08f144cd9889759426ab37c358e" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quantity_furniture_in_order" ADD CONSTRAINT "FK_f2a5f23077e0e874bd83c59544b" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quantity_furniture_in_order" ADD CONSTRAINT "FK_2d63258efc9b4c6cdcbff2c5b07" FOREIGN KEY ("furniture_id") REFERENCES "furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favourite_furniture" ADD CONSTRAINT "FK_53da068c2afa9c4a9970bd2d793" FOREIGN KEY ("furniture_id") REFERENCES "furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favourite_furniture" ADD CONSTRAINT "FK_1e2cf66da9f49fa1b2b0dbfb891" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture_statistic" ADD CONSTRAINT "FK_cfa9e80f3a56bf1e9a8dc13b7fc" FOREIGN KEY ("furniture_id") REFERENCES "furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_b84ead66a803f885b2a6359319d" FOREIGN KEY ("size_id") REFERENCES "size"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_9400883e54a9fac9be73db30733" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_56522900ffce4cb91586981d5ac" FOREIGN KEY ("category_id") REFERENCES "category_furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_36310bdcb8464675491dbc3f4e4" FOREIGN KEY ("subcategory_id") REFERENCES "subcategory_furniture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "size" ADD CONSTRAINT "FK_4e6c91a3fff794bd65054b4943d" FOREIGN KEY ("furnitureId") REFERENCES "size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture_color" ADD CONSTRAINT "FK_2b35308ed60eae0452d0e852e56" FOREIGN KEY ("furniture_id") REFERENCES "furniture"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "furniture_color" ADD CONSTRAINT "FK_ee72a03c7a5e9bec2ac6410ac6b" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture_material" ADD CONSTRAINT "FK_99de947ae283250a9295f712665" FOREIGN KEY ("furniture_id") REFERENCES "furniture"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "furniture_material" ADD CONSTRAINT "FK_71df08a7020dcbab0535118c4a2" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "furniture_material" DROP CONSTRAINT "FK_71df08a7020dcbab0535118c4a2"`);
        await queryRunner.query(`ALTER TABLE "furniture_material" DROP CONSTRAINT "FK_99de947ae283250a9295f712665"`);
        await queryRunner.query(`ALTER TABLE "furniture_color" DROP CONSTRAINT "FK_ee72a03c7a5e9bec2ac6410ac6b"`);
        await queryRunner.query(`ALTER TABLE "furniture_color" DROP CONSTRAINT "FK_2b35308ed60eae0452d0e852e56"`);
        await queryRunner.query(`ALTER TABLE "size" DROP CONSTRAINT "FK_4e6c91a3fff794bd65054b4943d"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_36310bdcb8464675491dbc3f4e4"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_56522900ffce4cb91586981d5ac"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_9400883e54a9fac9be73db30733"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_b84ead66a803f885b2a6359319d"`);
        await queryRunner.query(`ALTER TABLE "furniture_statistic" DROP CONSTRAINT "FK_cfa9e80f3a56bf1e9a8dc13b7fc"`);
        await queryRunner.query(`ALTER TABLE "favourite_furniture" DROP CONSTRAINT "FK_1e2cf66da9f49fa1b2b0dbfb891"`);
        await queryRunner.query(`ALTER TABLE "favourite_furniture" DROP CONSTRAINT "FK_53da068c2afa9c4a9970bd2d793"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "quantity_furniture_in_order" DROP CONSTRAINT "FK_2d63258efc9b4c6cdcbff2c5b07"`);
        await queryRunner.query(`ALTER TABLE "quantity_furniture_in_order" DROP CONSTRAINT "FK_f2a5f23077e0e874bd83c59544b"`);
        await queryRunner.query(`ALTER TABLE "delivery" DROP CONSTRAINT "FK_08f144cd9889759426ab37c358e"`);
        await queryRunner.query(`ALTER TABLE "subcategory_furniture" DROP CONSTRAINT "FK_7ef279f3ba828d68961652a4266"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71df08a7020dcbab0535118c4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99de947ae283250a9295f71266"`);
        await queryRunner.query(`DROP TABLE "furniture_material"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee72a03c7a5e9bec2ac6410ac6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b35308ed60eae0452d0e852e5"`);
        await queryRunner.query(`DROP TABLE "furniture_color"`);
        await queryRunner.query(`DROP TABLE "calculate_rate_furniture"`);
        await queryRunner.query(`DROP TABLE "banner"`);
        await queryRunner.query(`DROP TABLE "customer_info"`);
        await queryRunner.query(`DROP TABLE "is_show_price"`);
        await queryRunner.query(`DROP TABLE "payment_info"`);
        await queryRunner.query(`DROP TABLE "shipping_info"`);
        await queryRunner.query(`DROP TABLE "size"`);
        await queryRunner.query(`DROP TABLE "furniture"`);
        await queryRunner.query(`DROP TYPE "public"."furniture_currency_enum"`);
        await queryRunner.query(`DROP TYPE "public"."furniture_sellertype_enum"`);
        await queryRunner.query(`DROP TABLE "material"`);
        await queryRunner.query(`DROP TABLE "furniture_statistic"`);
        await queryRunner.query(`DROP TABLE "favourite_furniture"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_shippingmethod_enum"`);
        await queryRunner.query(`DROP TABLE "quantity_furniture_in_order"`);
        await queryRunner.query(`DROP TABLE "delivery"`);
        await queryRunner.query(`DROP TABLE "color"`);
        await queryRunner.query(`DROP TABLE "category_furniture"`);
        await queryRunner.query(`DROP TABLE "subcategory_furniture"`);
        await queryRunner.query(`DROP TABLE "brand"`);
    }

}
