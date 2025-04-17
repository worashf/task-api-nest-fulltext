import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePriorityFromTask1744902858687 implements MigrationInterface {
    name = 'RemovePriorityFromTask1744902858687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "priority"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "priority" integer NOT NULL`);
    }

}
