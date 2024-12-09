import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 'John',
    description: 'Employee first name',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Employee last name',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 1,
    description: 'Department ID',
  })
  @IsNumber()
  @IsNotEmpty()
  department_id: number;

  @ApiProperty({
    example: 1,
    description: 'Position ID',
  })
  @IsNumber()
  @IsNotEmpty()
  position_id: number;

  @ApiProperty({
    example: 1,
    description: 'Role ID',
  })
  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}
