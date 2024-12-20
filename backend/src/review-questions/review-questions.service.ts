import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewQuestion } from './entities/review-question.entity';
import { CreateReviewQuestionDto } from './dto/create-review-question.dto';
import { UpdateReviewQuestionDto } from './dto/update-review-question.dto';
import { FilterReviewQuestionDto } from './dto/filter-review-question.dto';

@Injectable()
export class ReviewQuestionsService {
  constructor(
    @InjectRepository(ReviewQuestion)
    private reviewQuestionRepository: Repository<ReviewQuestion>,
  ) {}

  create(createReviewQuestionDto: CreateReviewQuestionDto) {
    const reviewQuestion = this.reviewQuestionRepository.create(
      createReviewQuestionDto,
    );
    return this.reviewQuestionRepository.save(reviewQuestion);
  }

  async findAll(filters?: FilterReviewQuestionDto) {
    const queryBuilder = this.reviewQuestionRepository
      .createQueryBuilder('review_question')
      .leftJoinAndSelect('review_question.position', 'position');

    if (filters) {
      if (filters.question_type) {
        queryBuilder.andWhere('review_question.question_type = :questionType', {
          questionType: filters.question_type,
        });
      }

      if (filters.position_id) {
        queryBuilder.andWhere('review_question.position_id = :positionId', {
          positionId: filters.position_id,
        });
      }

      if (filters.review_cycle_id) {
        queryBuilder.andWhere(
          'review_question.review_cycle_id = :reviewCycleId',
          {
            reviewCycleId: filters.review_cycle_id,
          },
        );
      }
    }

    return queryBuilder.getMany();
  }

  findOne(id: number) {
    return this.reviewQuestionRepository.findOne({
      where: { question_id: id },
      relations: ['position'],
    });
  }

  async update(id: number, updateReviewQuestionDto: UpdateReviewQuestionDto) {
    await this.reviewQuestionRepository.update(id, updateReviewQuestionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const reviewQuestion = await this.findOne(id);
    return this.reviewQuestionRepository.remove(reviewQuestion);
  }
}
