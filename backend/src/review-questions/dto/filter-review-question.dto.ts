import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { QuestionType } from '../entities/review-question.entity';

export class FilterReviewQuestionDto {
  @ApiPropertyOptional({
    description: 'Filter by question type (self, peer, or manager)',
    enum: QuestionType,
  })
  @IsOptional()
  @IsEnum(QuestionType)
  question_type?: QuestionType;

  @ApiPropertyOptional({
    description: 'Filter by position ID',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  position_id?: number;

  @ApiPropertyOptional({
    description: 'Filter by review cycle ID',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  review_cycle_id?: number;
}
