import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewCycle } from './entities/review-cycle.entity';
import { ReviewCyclesService } from './review-cycles.service';
import { ReviewCyclesController } from './review-cycles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewCycle])],
  controllers: [ReviewCyclesController],
  providers: [ReviewCyclesService],
  exports: [ReviewCyclesService],
})
export class ReviewCyclesModule {}
