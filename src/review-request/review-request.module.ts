import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRequestService } from './review-request.service';
import { ReviewRequestController } from './review-request.controller';
import { ReviewRequest } from './entities/review-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRequest])],
  controllers: [ReviewRequestController],
  providers: [ReviewRequestService],
  exports: [ReviewRequestService],
})
export class ReviewRequestModule {}
