import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';

// Load environment variables
config();

if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new Error('Missing essential database environment variables.');
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'nest_task_db',
  synchronize: false, // if true, you don't really need migrations
  logging: true,
  entities: [User, Task], // Add the User and Task entities directly here
  migrations: ["src/db/migrations/*{.ts,.js}"], // where our migrations reside
});
