import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class CreateReviewCompletionDto {
  @ApiProperty({
    description: 'The ID of the employee',
    example: 1,
  })
  @IsNumber()
  employee_id: number;

  @ApiProperty({
    description: 'The ID of the review cycle',
    example: 1,
  })
  @IsNumber()
  cycle_id: number;

  @ApiProperty({
    description: 'The completion percentage of reviews (0-100)',
    example: 75,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  completion_percentage: number;
}
