import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsEnum } from 'class-validator';

enum ReviewCycleStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export class CreateReviewCycleDto {
  @ApiProperty({
    example: '01-01-2024',
    description: 'The start date of the review cycle (MM-DD-YYYY)',
  })
  @IsString()
  @Matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-\d{4}$/, {
    message: 'start_date must be in MM-DD-YYYY format',
  })
  start_date: string;

  @ApiProperty({
    example: '03-01-2024',
    description: 'The end date of the review cycle (MM-DD-YYYY)',
  })
  @IsString()
  @Matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-\d{4}$/, {
    message: 'end_date must be in MM-DD-YYYY format',
  })
  end_date: string;

  @ApiProperty({
    example: 'active',
    description: 'The status of the review cycle',
    enum: ReviewCycleStatus,
  })
  @IsEnum(ReviewCycleStatus, {
    message: 'status must be either draft, active, or completed',
  })
  status: ReviewCycleStatus;
}
