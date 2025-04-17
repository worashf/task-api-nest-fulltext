import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AppDataSource } from './data-source'; // Import your data source

@Module({
  imports: [
    // Load configuration globally
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // TypeOrmModule with dynamic configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...AppDataSource.options, // Spread the options from AppDataSource here
        migrationsRun: process.env.NODE_ENV !== 'production', // Run migrations unless in production
      }),
      inject: [ConfigService],
    }),

    // Import modules for Users and Tasks
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
