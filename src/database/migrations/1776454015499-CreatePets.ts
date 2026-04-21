import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePets1776454015499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE age_unit_enum AS ENUM ('años', 'meses', 'semanas')
    `);
    await queryRunner.query(`
      CREATE TABLE "mascotas"
      (
        "id_mascota"  uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "nombre"      character varying NOT NULL,
        "raza"        character varying NOT NULL,
        "edad"        integer           NOT NULL CHECK (edad >= 0 AND edad <= 50),
        "edad_unidad" age_unit_enum     NOT NULL DEFAULT 'años',
        "created_at"   TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at"  TIMESTAMP         NOT NULL DEFAULT now(),
        "id_cliente"  uuid              NOT NULL,
        CONSTRAINT "PK_mascotas_id_mascota" PRIMARY KEY ("id_mascota"),
        CONSTRAINT "FK_mascotas_cliente" FOREIGN KEY ("id_cliente")
          REFERENCES "customers" ("id_cliente") ON DELETE RESTRICT
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_mascotas_cliente" ON "mascotas" ("id_cliente")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_mascotas_nombre" ON "mascotas" ("nombre")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "mascotas"`);
    await queryRunner.query(`DROP TYPE age_unit_enum`);
  }
}
