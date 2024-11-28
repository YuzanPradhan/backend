import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'The ID of the review request',
    example: 1,
  })
  @IsNumber()
  request_id: number;

  @ApiProperty({
    description: 'The rating given (1-5)',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Review comments',
    example: 'Great performance in the last quarter.',
  })
  @IsString()
  comments: string;
}
