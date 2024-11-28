import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDepartmentDto {
  @ApiProperty({
    description: 'The name of the department',
    example: 'Engineering',
    required: false,
  })
  @IsString()
  @IsOptional()
  department_name?: string;

  @ApiProperty({
    description: 'The ID of the department head',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  department_head_id?: number;
}
