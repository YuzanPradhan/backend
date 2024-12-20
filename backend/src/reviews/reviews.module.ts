import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Employee } from '../employees/entities/employee.entity';
import { ReviewCycle } from '../review-cycles/entities/review-cycle.entity';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Review,
      Employee, // For FK validation
      ReviewCycle, // For FK validation
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService], // Export if other modules need it
})
export class ReviewsModule {}
