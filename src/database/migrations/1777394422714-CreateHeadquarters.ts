import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHeadquarters1777394422714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "headquarters" (
        "id_sucursal" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "nombre" character varying(100) NOT NULL,
        "direccion" character varying(255) NOT NULL,
        "telefono" character varying(20) NOT NULL,
        "activo" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sucursales_id_sucursal" PRIMARY KEY ("id_sucursal")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "idx_headquarters_nombre" ON "headquarters" ("nombre")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_headquarters_activo" ON "headquarters" ("activo")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "headquarters"`);
  }
}
