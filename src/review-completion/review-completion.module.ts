import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewCompletionService } from './review-completion.service';
import { ReviewCompletionController } from './review-completion.controller';
import { ReviewCompletion } from './entities/review-completion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewCompletion])],
  controllers: [ReviewCompletionController],
  providers: [ReviewCompletionService],
  exports: [ReviewCompletionService],
})
export class ReviewCompletionModule {}
