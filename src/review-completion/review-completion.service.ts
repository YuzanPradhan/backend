import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewCompletionDto } from './dto/create-review-completion.dto';
import { UpdateReviewCompletionDto } from './dto/update-review-completion.dto';
import { ReviewCompletion } from './entities/review-completion.entity';

@Injectable()
export class ReviewCompletionService {
  constructor(
    @InjectRepository(ReviewCompletion)
    private reviewCompletionRepository: Repository<ReviewCompletion>,
  ) {}

  async create(
    createReviewCompletionDto: CreateReviewCompletionDto,
  ): Promise<ReviewCompletion> {
    const reviewCompletion = this.reviewCompletionRepository.create({
      ...createReviewCompletionDto,
      employee: { employee_id: createReviewCompletionDto.employee_id },
      cycle: { cycle_id: createReviewCompletionDto.cycle_id },
    });
    return await this.reviewCompletionRepository.save(reviewCompletion);
  }

  async findAll(): Promise<ReviewCompletion[]> {
    return await this.reviewCompletionRepository.find({
      relations: ['employee', 'cycle'],
    });
  }

  async findOne(id: number): Promise<ReviewCompletion> {
    const reviewCompletion = await this.reviewCompletionRepository.findOne({
      where: { completion_id: id },
      relations: ['employee', 'cycle'],
    });

    if (!reviewCompletion) {
      throw new NotFoundException(`Review completion with ID ${id} not found`);
    }

    return reviewCompletion;
  }

  async update(
    id: number,
    updateReviewCompletionDto: UpdateReviewCompletionDto,
  ): Promise<ReviewCompletion> {
    const reviewCompletion = await this.findOne(id);

    Object.assign(reviewCompletion, updateReviewCompletionDto);

    return await this.reviewCompletionRepository.save(reviewCompletion);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reviewCompletionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Review completion with ID ${id} not found`);
    }
  }

  async findByEmployee(employeeId: number): Promise<ReviewCompletion[]> {
    return await this.reviewCompletionRepository.find({
      where: { employee_id: employeeId },
      relations: ['employee', 'cycle'],
    });
  }

  async findByReviewCycle(cycleId: number): Promise<ReviewCompletion[]> {
    return await this.reviewCompletionRepository.find({
      where: { cycle_id: cycleId },
      relations: ['employee', 'cycle'],
    });
  }
}
