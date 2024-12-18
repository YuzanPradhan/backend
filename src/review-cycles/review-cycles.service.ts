import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewCycle } from './entities/review-cycle.entity';
import { CreateReviewCycleDto } from './dto/create-review-cycle.dto';
import { UpdateReviewCycleDto } from './dto/update-review-cycle.dto';

@Injectable()
export class ReviewCyclesService {
  constructor(
    @InjectRepository(ReviewCycle)
    private reviewCycleRepository: Repository<ReviewCycle>,
  ) {}

  create(createReviewCycleDto: CreateReviewCycleDto) {
    const reviewCycle = this.reviewCycleRepository.create(createReviewCycleDto);
    return this.reviewCycleRepository.save(reviewCycle);
  }

  findAll() {
    return this.reviewCycleRepository.find();
  }

  findOne(id: number) {
    return this.reviewCycleRepository.findOne({
      where: { cycle_id: id },
    });
  }

  async update(id: number, updateReviewCycleDto: UpdateReviewCycleDto) {
    await this.reviewCycleRepository.update(id, updateReviewCycleDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const reviewCycle = await this.findOne(id);
    return this.reviewCycleRepository.remove(reviewCycle);
  }
}
