import { ApiProperty } from '@nestjs/swagger';
import { EmployeeResponseDto } from '../../employees/dto/employee-response.dto';

export class DepartmentResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the department',
    example: 1,
  })
  department_id: number;

  @ApiProperty({
    description: 'The name of the department',
    example: 'Engineering',
  })
  department_name: string;

  @ApiProperty({
    description: 'The ID of the department head',
    example: 1,
  })
  department_head_id: number;

  @ApiProperty({
    description: 'List of employees in the department',
    type: () => [EmployeeResponseDto],
  })
  employees?: EmployeeResponseDto[];
}
