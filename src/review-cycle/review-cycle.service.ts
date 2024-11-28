import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewCycleDto } from './dto/create-review-cycle.dto';
import { UpdateReviewCycleDto } from './dto/update-review-cycle.dto';
import { ReviewCycle } from './entities/review-cycle.entity';

@Injectable()
export class ReviewCycleService {
  constructor(
    @InjectRepository(ReviewCycle)
    private reviewCycleRepository: Repository<ReviewCycle>,
  ) {}

  async create(
    createReviewCycleDto: CreateReviewCycleDto,
  ): Promise<ReviewCycle> {
    const reviewCycle = this.reviewCycleRepository.create(createReviewCycleDto);
    return await this.reviewCycleRepository.save(reviewCycle);
  }

  async findAll(): Promise<ReviewCycle[]> {
    return await this.reviewCycleRepository.find({
      relations: ['reviewCompletions', 'reviewRequests'],
    });
  }

  async findOne(id: number): Promise<ReviewCycle> {
    const reviewCycle = await this.reviewCycleRepository.findOne({
      where: { cycle_id: id },
      relations: ['reviewCompletions', 'reviewRequests'],
    });

    if (!reviewCycle) {
      throw new NotFoundException(`Review cycle with ID ${id} not found`);
    }

    return reviewCycle;
  }

  async update(
    id: number,
    updateReviewCycleDto: UpdateReviewCycleDto,
  ): Promise<ReviewCycle> {
    const reviewCycle = await this.findOne(id);

    Object.assign(reviewCycle, updateReviewCycleDto);

    return await this.reviewCycleRepository.save(reviewCycle);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reviewCycleRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Review cycle with ID ${id} not found`);
    }
  }
}
