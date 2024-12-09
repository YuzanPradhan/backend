import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRequest } from './entities/review-request.entity';
import { Employee } from '../employees/entities/employee.entity';
import { ReviewCycle } from '../review-cycles/entities/review-cycle.entity';
import { ReviewRequestsService } from './review-requests.service';
import { ReviewRequestsController } from './review-requests.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewRequest,
      Employee, // For FK validation
      ReviewCycle, // For FK validation
    ]),
  ],
  controllers: [ReviewRequestsController],
  providers: [ReviewRequestsService],
  exports: [ReviewRequestsService], // Export if other modules need it
})
export class ReviewRequestsModule {}
