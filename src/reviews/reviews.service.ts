import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    try {
      const review = this.reviewRepository.create(createReviewDto);
      return await this.reviewRepository.save(review);
    } catch (error) {
      throw new InternalServerErrorException('Database connection error');
    }
  }

  async findAll() {
    try {
      return await this.reviewRepository.find({
        relations: ['reviewer', 'reviewee', 'reviewCycle'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Database connection error');
    }
  }

  async findOne(id: number) {
    try {
      return await this.reviewRepository.findOne({
        where: { review_id: id },
        relations: ['reviewer', 'reviewee', 'reviewCycle'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Database connection error');
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      await this.reviewRepository.update(id, updateReviewDto);
      return this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Database connection error');
    }
  }

  async remove(id: number) {
    try {
      const review = await this.findOne(id);
      return await this.reviewRepository.remove(review);
    } catch (error) {
      throw new InternalServerErrorException('Database connection error');
    }
  }
}
