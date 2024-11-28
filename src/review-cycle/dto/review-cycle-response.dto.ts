import { ApiProperty } from '@nestjs/swagger';
import { ReviewCompletionResponseDto } from '../../review-completion/dto/review-completion-response.dto';
import { ReviewRequestResponseDto } from '../../review-request/dto/review-request-response.dto';

export class ReviewCycleResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the review cycle',
    example: 1,
  })
  cycle_id: number;

  @ApiProperty({
    description: 'The start date of the review cycle',
    example: '2023-01-01',
  })
  start_date: Date;

  @ApiProperty({
    description: 'The end date of the review cycle',
    example: '2023-03-31',
  })
  end_date: Date;

  @ApiProperty({
    description: 'The status of the review cycle',
    example: 'active',
    enum: ['planned', 'active', 'completed'],
  })
  status: string;

  @ApiProperty({
    description: 'List of review completions in this cycle',
    type: () => [ReviewCompletionResponseDto],
  })
  reviewCompletions?: ReviewCompletionResponseDto[];

  @ApiProperty({
    description: 'List of review requests in this cycle',
    type: () => [ReviewRequestResponseDto],
  })
  reviewRequests?: ReviewRequestResponseDto[];
}
