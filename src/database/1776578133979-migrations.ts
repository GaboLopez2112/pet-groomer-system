import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1776578133979 implements MigrationInterface {
  name = 'Migrations1776578133979';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clientes" ("id_cliente" uuid NOT NULL DEFAULT uuid_generate_v4(), "cedula" character varying NOT NULL, "nombre" character varying NOT NULL, "celular" character varying(15) NOT NULL, "celular_opcional" character varying(15), "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_28fa93cdc380ac510988890cceb" UNIQUE ("cedula"), CONSTRAINT "UQ_3cd5652ab34ca1a0a2c7a255313" UNIQUE ("email"), CONSTRAINT "PK_4b7c4b981b60b5c6b1d04c84a54" PRIMARY KEY ("id_cliente"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."mascotas_edad_unidad_enum" AS ENUM('años', 'meses', 'semanas')`,
    );
    await queryRunner.query(
      `CREATE TABLE "mascotas" ("id_mascota" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying NOT NULL, "raza" character varying NOT NULL, "edad" integer NOT NULL, "edad_unidad" "public"."mascotas_edad_unidad_enum" NOT NULL DEFAULT 'años', "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id_cliente" uuid, CONSTRAINT "PK_7eba8c247a130f209a858a3d895" PRIMARY KEY ("id_mascota"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "mascotas" ADD CONSTRAINT "FK_4211b82018b63a423a5998ddde3" FOREIGN KEY ("id_cliente") REFERENCES "clientes"("id_cliente") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "mascotas" DROP CONSTRAINT "FK_4211b82018b63a423a5998ddde3"`,
    );
    await queryRunner.query(`DROP TABLE "mascotas"`);
    await queryRunner.query(`DROP TYPE "public"."mascotas_edad_unidad_enum"`);
    await queryRunner.query(`DROP TABLE "clientes"`);
  }
}
