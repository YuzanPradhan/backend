import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewCycleService } from './review-cycle.service';
import { ReviewCycleController } from './review-cycle.controller';
import { ReviewCycle } from './entities/review-cycle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewCycle])],
  controllers: [ReviewCycleController],
  providers: [ReviewCycleService],
  exports: [ReviewCycleService],
})
export class ReviewCycleModule {}
