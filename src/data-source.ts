// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './users/user.entity'; // Correct path without .ts in string
import { Task } from './tasks/task.entity'; // Correct path without .ts in string

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'task_manager',
  entities: [User, Task],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false, // Set to false to use migrations
});