import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateServices1776798951187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "service"(
      "id_servicio" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "nombre" character varying NOT NULL,
      "descripcion" character varying NULL,
      "costo" float NOT NULL,
      "estado" bool NOT NULL default true,
      "created_at"   TIMESTAMP         NOT NULL DEFAULT now(),
      "updated_at"  TIMESTAMP         NOT NULL DEFAULT now(),
      CONSTRAINT "PK_servicios_id_servicio" PRIMARY KEY ("id_servicio")
    )
    `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "servicios"`);
  }
}
