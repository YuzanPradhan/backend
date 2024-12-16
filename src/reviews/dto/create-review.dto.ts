import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the employee giving the review',
  })
  @IsNumber()
  @IsNotEmpty()
  reviewer_id: number;

  @ApiProperty({
    example: 2,
    description: 'The ID of the employee receiving the review',
  })
  @IsNumber()
  @IsNotEmpty()
  reviewee_id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the review cycle',
  })
  @IsNumber()
  @IsNotEmpty()
  cycle_id: number;

  @ApiProperty({
    example: {
      question1: 'answer1',
      question2: 'answer2',
    },
    description: 'The questions and their corresponding answers',
  })
  @IsObject()
  @IsNotEmpty()
  questions_and_answers: object;

  @ApiProperty({
    example: 4,
    description: 'Rating value between 1 and 5',
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;
}
