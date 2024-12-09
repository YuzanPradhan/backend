import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewQuestion } from './entities/review-question.entity';
import { CreateReviewQuestionDto } from './dto/create-review-question.dto';
import { UpdateReviewQuestionDto } from './dto/update-review-question.dto';

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

  findAll() {
    return this.reviewQuestionRepository.find({
      relations: ['position'],
    });
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
