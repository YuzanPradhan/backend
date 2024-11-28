import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, Max, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({
    description: 'The ID of the review request',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  request_id?: number;

  @ApiProperty({
    description: 'The ID of the reviewer',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  reviewer_id?: number;

  @ApiProperty({
    description: 'The ID of the employee being reviewed',
    example: 2,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  reviewee_id?: number;

  @ApiProperty({
    description: 'The ID of the review cycle',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  cycle_id?: number;

  @ApiProperty({
    description: 'The rating given (1-5)',
    example: 4,
    minimum: 1,
    maximum: 5,
    required: false,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({
    description: 'Review comments',
    example: 'Great performance in the last quarter.',
    required: false,
  })
  @IsString()
  @IsOptional()
  comments?: string;
}
