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

// Database Configuration
export const databaseConfig = registerAs('database', () => ({
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
  synchronize: process.env.NODE_ENV === 'development',
  dropSchema: false,
  autoLoadEntities: true,
  logging: false,
}));

// Main Configuration
export default () => ({
  port: parseInt(process.env.PORT, 10),
  database: databaseConfig(),
  environment: process.env.NODE_ENV,
});
