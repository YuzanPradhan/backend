import { ApiProperty } from '@nestjs/swagger';

export class CreatePositionDto {
  @ApiProperty({
    example: 'Senior Software Engineer',
    description: 'The name of the position',
  })
  position_name: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the department this position belongs to',
  })
  department_id: number;
}
