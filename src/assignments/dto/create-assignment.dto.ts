import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the review cycle',
  })
  @IsNumber()
  @IsNotEmpty()
  review_cycle_id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the manager',
  })
  @IsNumber()
  @IsNotEmpty()
  manager_id: number;

  @ApiProperty({
    example: 2,
    description: 'The ID of the employee being assigned',
  })
  @IsNumber()
  @IsNotEmpty()
  employee_id: number;
}
