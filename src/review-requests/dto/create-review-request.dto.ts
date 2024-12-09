import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateReviewRequestDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the employee being reviewed',
  })
  @IsNumber()
  @IsNotEmpty()
  reviewee_id: number;

  @ApiProperty({
    example: 2,
    description: 'The ID of the employee performing the review',
  })
  @IsNumber()
  @IsNotEmpty()
  reviewer_id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the review cycle',
  })
  @IsNumber()
  @IsNotEmpty()
  cycle_id: number;

  @ApiProperty({
    example: 'pending',
    description: 'The status of the review request',
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
