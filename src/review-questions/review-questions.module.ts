import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewQuestion } from './entities/review-question.entity';
import { Position } from '../positions/entities/position.entity';
import { ReviewQuestionsService } from './review-questions.service';
import { ReviewQuestionsController } from './review-questions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewQuestion,
      Position, // For FK validation
    ]),
  ],
  controllers: [ReviewQuestionsController],
  providers: [ReviewQuestionsService],
  exports: [ReviewQuestionsService], // Export if other modules need it
})
export class ReviewQuestionsModule {}
