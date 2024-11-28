import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './department/department.module';
import { EmployeesModule } from './employees/employees.module';
import { ReviewCycleModule } from './review-cycle/review-cycle.module';
import { ReviewRequestModule } from './review-request/review-request.module';
import { ReviewCompletionModule } from './review-completion/review-completion.module';
import { ReviewModule } from './review/review.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/AllExceptionsFilter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validate: (config: Record<string, any>) => {
        const requiredEnvVars = [
          'DATABASE_HOST',
          'DATABASE_PORT',
          'DATABASE_USERNAME',
          'DATABASE_PASSWORD',
          'DATABASE_NAME',
        ];

        for (const envVar of requiredEnvVars) {
          if (!config[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
          }
        }
        return config;
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        synchronize: configService.get<boolean>('DATABASE_SYNC'),
        logging: configService.get<boolean>('DATABASE_LOGGING'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    DepartmentModule,
    EmployeesModule,
    ReviewCycleModule,
    ReviewRequestModule,
    ReviewCompletionModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
