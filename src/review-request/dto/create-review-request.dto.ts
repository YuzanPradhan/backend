import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsIn } from 'class-validator';

export class CreateReviewRequestDto {
  @ApiProperty({
    description: 'The ID of the employee requesting the review',
    example: 1,
  })
  @IsNumber()
  requester_id: number;

  @ApiProperty({
    description: 'The ID of the employee to be reviewed',
    example: 2,
  })
  @IsNumber()
  reviewee_id: number;

  @ApiProperty({
    description: 'The ID of the review cycle',
    example: 1,
  })
  @IsNumber()
  cycle_id: number;

  @ApiProperty({
    description: 'The status of the review request',
    example: 'pending',
    enum: ['pending', 'in_progress', 'completed'],
  })
  @IsString()
  @IsIn(['pending', 'in_progress', 'completed'])
  status: string;
}
