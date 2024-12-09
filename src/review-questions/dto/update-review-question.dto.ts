import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewQuestionDto } from './create-review-question.dto';

export class UpdateReviewQuestionDto extends PartialType(
  CreateReviewQuestionDto,
) {}
