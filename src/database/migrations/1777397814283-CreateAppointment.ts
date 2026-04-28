import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppointment1777397814283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE appointment_status_enum AS ENUM ('pendiente', 'completado', 'cancelado')
    `);

    await queryRunner.query(`
      CREATE TABLE "citas" (
        "id_cita" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "fecha" date NOT NULL,
        "hora" time NOT NULL,
        "estado" appointment_status_enum NOT NULL DEFAULT 'pendiente',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "id_mascota" uuid NOT NULL,
        "id_servicio" uuid NOT NULL,
        "id_peluquero" uuid NOT NULL,
        "id_sucursal" uuid NOT NULL,
        CONSTRAINT "PK_citas_id_cita" PRIMARY KEY ("id_cita"),
        CONSTRAINT "FK_citas_mascota" FOREIGN KEY ("id_mascota") 
          REFERENCES "mascotas"("id_mascota") ON DELETE RESTRICT,
        CONSTRAINT "FK_citas_servicio" FOREIGN KEY ("id_servicio") 
          REFERENCES "service"("id_servicio") ON DELETE RESTRICT,
        CONSTRAINT "FK_citas_peluquero" FOREIGN KEY ("id_peluquero") 
          REFERENCES "groomers"("id_peluquero") ON DELETE RESTRICT,
        CONSTRAINT "FK_citas_headquarter" FOREIGN KEY ("id_sucursal") 
          REFERENCES "headquarters"("id_sucursal") ON DELETE RESTRICT
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_citas_fecha" ON "citas" ("fecha")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_citas_fecha_hora" ON "citas" ("fecha", "hora")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_citas_mascota" ON "citas" ("id_mascota")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_citas_peluquero" ON "citas" ("id_peluquero")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_citas_headquarter" ON "citas" ("id_sucursal")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_citas_estado" ON "citas" ("estado")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_citas_fecha"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_citas_fecha_hora"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_citas_mascota"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_citas_peluquero"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_citas_headquarter"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_citas_estado"`);

    await queryRunner.query(`DROP TABLE IF EXISTS "citas"`);

    await queryRunner.query(`DROP TYPE IF EXISTS appointment_status_enum`);
  }
}
