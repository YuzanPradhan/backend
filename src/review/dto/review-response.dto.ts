import { ApiProperty } from '@nestjs/swagger';
import { ReviewRequestResponseDto } from '../../review-request/dto/review-request-response.dto';

export class ReviewResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the review',
    example: 1,
  })
  review_id: number;

  @ApiProperty({
    description: 'The ID of the review request',
    example: 1,
  })
  request_id: number;

  @ApiProperty({
    description: 'The ID of the reviewer',
    example: 1,
  })
  reviewer_id: number;

  @ApiProperty({
    description: 'The ID of the employee being reviewed',
    example: 2,
  })
  reviewee_id: number;

  @ApiProperty({
    description: 'The ID of the review cycle',
    example: 1,
  })
  cycle_id: number;

  @ApiProperty({
    description: 'The rating given (1-5)',
    example: 4,
  })
  rating: number;

  @ApiProperty({
    description: 'Review comments',
    example: 'Great performance in the last quarter.',
  })
  comments: string;

  @ApiProperty({
    description: 'The date when the review was created',
  })
  created_at: Date;

  @ApiProperty({
    description: 'The associated review request',
    type: () => ReviewRequestResponseDto,
  })
  reviewRequest?: ReviewRequestResponseDto;
}
