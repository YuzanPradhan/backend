import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNumber,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmployeeDto {
  @ApiProperty({
    description: 'The name of the employee',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The email address of the employee',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The ID of the department the employee belongs to',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  department_id?: number;

  @ApiProperty({
    description: 'The position/role of the employee',
    example: 'Software Engineer',
    required: false,
  })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({
    description: 'The date when the employee joined',
    example: '2023-01-01',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date_joined?: Date;
}
