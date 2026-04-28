import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGroomer1777324018761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "groomers" (
      "id_peluquero" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "cedula" character varying NOT NULL,
      "nombre" character varying NOT NULL,
      "celular" character varying(15) NOT NULL,
      "email" character varying NOT NULL,
      "activo" bool NOT NULL default true,
      "created_at"       TIMESTAMP             NOT NULL DEFAULT now(),
      "updated_at"       TIMESTAMP             NOT NULL DEFAULT now(),
      CONSTRAINT "PK_groomer_id_peluquero" PRIMARY KEY ("id_peluquero"),
      CONSTRAINT "UQ_groomer_cedula" UNIQUE ("cedula"),
      CONSTRAINT "UQ_groomer_email" UNIQUE ("email")
    )
    `);
    await queryRunner.query(`
      CREATE INDEX "idx_groomers_nombre" ON "groomers" ("nombre")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_groomers_cedula" ON "groomers" ("cedula")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "groomers"`);
  }
}
