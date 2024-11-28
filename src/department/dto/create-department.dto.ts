import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    description: 'The name of the department',
    example: 'Engineering',
  })
  @IsString()
  department_name: string;

  @ApiProperty({
    description: 'The ID of the department head',
    example: 1,
  })
  @IsNumber()
  department_head_id: number;
}
