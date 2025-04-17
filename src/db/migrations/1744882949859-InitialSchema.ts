import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1744882949859 implements MigrationInterface {
    name = 'InitialSchema1744882949859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "priority" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "priority"`);
    }

}
