import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomers1776447609219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "customers"
      (
        "id_cliente"       uuid                  NOT NULL DEFAULT uuid_generate_v4(),
        "cedula"           character varying     NOT NULL,
        "nombre"           character varying     NOT NULL,
        "celular"          character varying(15) NOT NULL,
        "celular_opcional" character varying(15),
        "email"            character varying     NOT NULL,
        "created_at"       TIMESTAMP             NOT NULL DEFAULT now(),
        "updated_at"       TIMESTAMP             NOT NULL DEFAULT now(),
        CONSTRAINT "PK_customers_id_cliente" PRIMARY KEY ("id_cliente"),
        CONSTRAINT "UQ_customers_cedula" UNIQUE ("cedula"),
        CONSTRAINT "UQ_customers_email" UNIQUE ("email")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_customers_nombre" ON "customers" ("nombre")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_customers_cedula" ON "customers" ("cedula")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
