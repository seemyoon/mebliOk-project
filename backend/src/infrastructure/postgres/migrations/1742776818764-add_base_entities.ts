import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1742776818764 implements MigrationInterface {
    name = 'AddBaseEntities1742776818764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."order_shippingmethod_enum" RENAME TO "order_shippingmethod_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."order_shippingmethod_enum" AS ENUM('DELIVERY', 'SELF_PICKUP', 'NOVA_POST')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shippingMethod" TYPE "public"."order_shippingmethod_enum" USING "shippingMethod"::"text"::"public"."order_shippingmethod_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_shippingmethod_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_shippingmethod_enum_old" AS ENUM('delivery', 'self-pickup', 'nova-post')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shippingMethod" TYPE "public"."order_shippingmethod_enum_old" USING "shippingMethod"::"text"::"public"."order_shippingmethod_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."order_shippingmethod_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."order_shippingmethod_enum_old" RENAME TO "order_shippingmethod_enum"`);
    }

}
