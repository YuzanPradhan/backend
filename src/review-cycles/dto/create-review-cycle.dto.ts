import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewCycleDto {
  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The start date of the review cycle',
  })
  start_date: Date;

  @ApiProperty({
    example: '2024-03-31T23:59:59.999Z',
    description: 'The end date of the review cycle',
  })
  end_date: Date;

  @ApiProperty({
    example: 'active',
    description: 'The status of the review cycle',
    enum: ['draft', 'active', 'completed'],
  })
  status: string;
}
