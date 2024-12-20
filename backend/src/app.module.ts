import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DepartmentsModule } from './departments/departments.module';
import { PositionsModule } from './positions/positions.module';
import { RolesModule } from './roles/roles.module';
import { EmployeesModule } from './employees/employees.module';
import { ReviewQuestionsModule } from './review-questions/review-questions.module';
import { ReviewCyclesModule } from './review-cycles/review-cycles.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ReviewRequestsModule } from './review-requests/review-requests.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import configuration, { databaseConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`,
      load: [configuration, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    DepartmentsModule,
    PositionsModule,
    RolesModule,
    EmployeesModule,
    ReviewQuestionsModule,
    ReviewCyclesModule,
    AssignmentsModule,
    ReviewRequestsModule,
    ReviewsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
