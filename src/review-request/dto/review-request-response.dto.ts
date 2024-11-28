import { ApiProperty } from '@nestjs/swagger';
import { EmployeeResponseDto } from '../../employees/dto/employee-response.dto';
import { ReviewCycleResponseDto } from '../../review-cycle/dto/review-cycle-response.dto';
import { ReviewResponseDto } from '../../review/dto/review-response.dto';

export class ReviewRequestResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the review request',
    example: 1,
  })
  request_id: number;

  @ApiProperty({
    description: 'The ID of the employee requesting the review',
    example: 1,
  })
  requester_id: number;

  @ApiProperty({
    description: 'The ID of the employee to be reviewed',
    example: 2,
  })
  reviewee_id: number;

  @ApiProperty({
    description: 'The ID of the review cycle',
    example: 1,
  })
  cycle_id: number;

  @ApiProperty({
    description: 'The status of the review request',
    example: 'pending',
    enum: ['pending', 'in_progress', 'completed'],
  })
  status: string;

  @ApiProperty({
    description: 'The date when the request was created',
  })
  created_at: Date;

  @ApiProperty({
    description: 'The date when the request was last updated',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'The employee who requested the review',
    type: () => EmployeeResponseDto,
  })
  requester?: EmployeeResponseDto;

  @ApiProperty({
    description: 'The employee being reviewed',
    type: () => EmployeeResponseDto,
  })
  reviewee?: EmployeeResponseDto;

  @ApiProperty({
    description: 'The associated review cycle',
    type: () => ReviewCycleResponseDto,
  })
  cycle?: ReviewCycleResponseDto;

  @ApiProperty({
    description: 'The associated review',
    type: () => ReviewResponseDto,
  })
  review?: ReviewResponseDto;
}
