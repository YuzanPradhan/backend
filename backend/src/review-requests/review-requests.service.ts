import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewRequest } from './entities/review-request.entity';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { UpdateReviewRequestDto } from './dto/update-review-request.dto';

@Injectable()
export class ReviewRequestsService {
  constructor(
    @InjectRepository(ReviewRequest)
    private reviewRequestRepository: Repository<ReviewRequest>,
  ) {}

  create(createReviewRequestDto: CreateReviewRequestDto) {
    const reviewRequest = this.reviewRequestRepository.create(
      createReviewRequestDto,
    );
    return this.reviewRequestRepository.save(reviewRequest);
  }

  findAll() {
    return this.reviewRequestRepository.find({
      relations: ['reviewer', 'reviewee', 'reviewCycle'],
    });
  }

  findOne(id: number) {
    return this.reviewRequestRepository.findOne({
      where: { request_id: id },
      relations: ['reviewer', 'reviewee', 'reviewCycle'],
    });
  }

  async update(id: number, updateReviewRequestDto: UpdateReviewRequestDto) {
    await this.reviewRequestRepository.update(id, updateReviewRequestDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const reviewRequest = await this.findOne(id);
    return this.reviewRequestRepository.remove(reviewRequest);
  }

  async findMyReviewRequests(employeeId: number) {
    return this.reviewRequestRepository.find({
      where: {
        reviewer_id: employeeId,
      },
      relations: [
        'reviewer',
        'reviewee',
        'reviewCycle',
        'reviewee.department',
        'reviewee.position',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findMyPendingReviews(employeeId: number) {
    return this.reviewRequestRepository.find({
      where: {
        reviewer_id: employeeId,
        status: 'pending',
      },
      relations: [
        'reviewer',
        'reviewee',
        'reviewCycle',
        'reviewee.department',
        'reviewee.position',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }
}
