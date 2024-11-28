import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { UpdateReviewRequestDto } from './dto/update-review-request.dto';
import { ReviewRequest } from './entities/review-request.entity';

@Injectable()
export class ReviewRequestService {
  constructor(
    @InjectRepository(ReviewRequest)
    private reviewRequestRepository: Repository<ReviewRequest>,
  ) {}

  async create(
    createReviewRequestDto: CreateReviewRequestDto,
  ): Promise<ReviewRequest> {
    const reviewRequest = this.reviewRequestRepository.create({
      requester: { employee_id: createReviewRequestDto.requester_id },
      reviewee: { employee_id: createReviewRequestDto.reviewee_id },
      cycle: { cycle_id: createReviewRequestDto.cycle_id },
      created_at: new Date(),
      updated_at: new Date(),
      status: createReviewRequestDto.status || 'PENDING',
    });
    return await this.reviewRequestRepository.save(reviewRequest);
  }

  async findAll(): Promise<ReviewRequest[]> {
    return await this.reviewRequestRepository.find({
      relations: ['requester', 'reviewee', 'cycle', 'review'],
    });
  }

  async findOne(id: number): Promise<ReviewRequest> {
    const reviewRequest = await this.reviewRequestRepository.findOne({
      where: { request_id: id },
      relations: ['requester', 'reviewee', 'cycle', 'review'],
    });

    if (!reviewRequest) {
      throw new NotFoundException(`Review request with ID ${id} not found`);
    }

    return reviewRequest;
  }

  async update(
    id: number,
    updateReviewRequestDto: UpdateReviewRequestDto,
  ): Promise<ReviewRequest> {
    const reviewRequest = await this.findOne(id);

    Object.assign(reviewRequest, {
      ...updateReviewRequestDto,
      updated_at: new Date(),
    });

    return await this.reviewRequestRepository.save(reviewRequest);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reviewRequestRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Review request with ID ${id} not found`);
    }
  }

  async findByReviewer(reviewerId: number): Promise<ReviewRequest[]> {
    return await this.reviewRequestRepository.find({
      where: { requester: { employee_id: reviewerId } },
      relations: ['requester', 'reviewee', 'cycle', 'review'],
    });
  }

  async findByReviewee(revieweeId: number): Promise<ReviewRequest[]> {
    return await this.reviewRequestRepository.find({
      where: { reviewee: { employee_id: revieweeId } },
      relations: ['requester', 'reviewee', 'cycle', 'review'],
    });
  }
}
