import { ApiProperty } from '@nestjs/swagger';
import { EmployeeResponseDto } from '../../employees/dto/employee-response.dto';
import { ReviewCycleResponseDto } from '../../review-cycle/dto/review-cycle-response.dto';

export class ReviewCompletionResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the review completion',
    example: 1,
  })
  completion_id: number;

  @ApiProperty({
    description: 'The ID of the employee',
    example: 1,
  })
  employee_id: number;

  @ApiProperty({
    description: 'The ID of the review cycle',
    example: 1,
  })
  cycle_id: number;

  @ApiProperty({
    description: 'The completion percentage of reviews (0-100)',
    example: 75,
  })
  completion_percentage: number;

  @ApiProperty({
    description: 'The employee details',
    type: () => EmployeeResponseDto,
  })
  employee?: EmployeeResponseDto;

  @ApiProperty({
    description: 'The review cycle details',
    type: () => ReviewCycleResponseDto,
  })
  cycle?: ReviewCycleResponseDto;
}
