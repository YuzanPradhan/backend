import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    example: 'Engineering',
    description: 'The name of the department',
  })
  department_name: string;
}
