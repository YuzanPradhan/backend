import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiProperty({
    example: 1,
    description: 'The ID of the reviewer',
    required: false,
  })
  reviewer_id?: number;

  @ApiProperty({
    example: 2,
    description: 'The ID of the reviewee',
    required: false,
  })
  reviewee_id?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the review cycle',
    required: false,
  })
  cycle_id?: number;

  @ApiProperty({
    example: {
      performance: 'Excellent',
      communication: 'Good',
      leadership: 'Outstanding',
    },
    description: 'The questions and their corresponding answers',
    required: false,
  })
  questions_and_answers?: object;
}
