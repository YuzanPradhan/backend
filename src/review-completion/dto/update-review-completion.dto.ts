import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsOptional } from 'class-validator';

export class UpdateReviewCompletionDto {
  @ApiProperty({
    description: 'The ID of the employee',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  employee_id?: number;

  @ApiProperty({
    description: 'The ID of the review cycle',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  cycle_id?: number;

  @ApiProperty({
    description: 'The completion percentage of reviews (0-100)',
    example: 75,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  completion_percentage?: number;
}
