import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Employee } from '../employees/entities/employee.entity';
import { ReviewCycle } from '../review-cycles/entities/review-cycle.entity';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Assignment,
      Employee, // For FK validation
      ReviewCycle, // For FK validation
    ]),
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService], // Export if other modules need it
})
export class AssignmentsModule {}
