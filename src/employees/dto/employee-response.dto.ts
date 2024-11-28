import { ApiProperty } from '@nestjs/swagger';
import { DepartmentResponseDto } from '../../department/dto/department-response.dto';
import { ReviewCompletionResponseDto } from '../../review-completion/dto/review-completion-response.dto';
import { ReviewRequestResponseDto } from '../../review-request/dto/review-request-response.dto';

export class EmployeeResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the employee',
    example: 1,
  })
  employee_id: number;

  @ApiProperty({
    description: 'The name of the employee',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the employee',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The ID of the department the employee belongs to',
    example: 1,
  })
  department_id: number;

  @ApiProperty({
    description: 'The position/role of the employee',
    example: 'Software Engineer',
  })
  position: string;

  @ApiProperty({
    description: 'The date when the employee joined',
    example: '2023-01-01',
  })
  date_joined: Date;

  @ApiProperty({
    description: 'The department details',
    type: () => DepartmentResponseDto,
  })
  department?: DepartmentResponseDto;

  @ApiProperty({
    description: 'List of review completions',
    type: () => [ReviewCompletionResponseDto],
  })
  reviewCompletions?: ReviewCompletionResponseDto[];

  @ApiProperty({
    description: 'List of review requests made by the employee',
    type: () => [ReviewRequestResponseDto],
  })
  reviewRequests?: ReviewRequestResponseDto[];

  @ApiProperty({
    description: 'List of review requests where the employee is being reviewed',
    type: () => [ReviewRequestResponseDto],
  })
  revieweeRequests?: ReviewRequestResponseDto[];
}
