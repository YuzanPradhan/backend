import { registerAs } from '@nestjs/config';
import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
import { Role } from '../roles/entities/role.entity';
import { Employee } from '../employees/entities/employee.entity';
import { ReviewQuestion } from '../review-questions/entities/review-question.entity';
import { ReviewCycle } from '../review-cycles/entities/review-cycle.entity';
import { Assignment } from '../assignments/entities/assignment.entity';
import { ReviewRequest } from '../review-requests/entities/review-request.entity';
import { Review } from '../reviews/entities/review.entity';

// Database Configuration Interface
export interface DatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: any[];
  synchronize: boolean;
  autoLoadEntities: boolean;
  logging?: boolean;
}

// Main Configuration Interface
export interface Config {
  port: number;
  database: DatabaseConfig;
  environment: string;
}

// Database Configuration
export const databaseConfig = registerAs('database', () => ({
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'review',
  entities: [
    Department,
    Position,
    Role,
    Employee,
    ReviewQuestion,
    ReviewCycle,
    Assignment,
    ReviewRequest,
    Review,
  ],
  synchronize: true,
  dropSchema: true,
  autoLoadEntities: true,
  logging: false,
}));

// Main Configuration
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: databaseConfig(),
  environment: process.env.NODE_ENV || 'development',
});
