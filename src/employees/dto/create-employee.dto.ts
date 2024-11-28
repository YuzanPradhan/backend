import {
  IsString,
  IsEmail,
  IsNumber,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'The name of the employee',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email address of the employee',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The ID of the department the employee belongs to',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  department_id: number;

  @ApiProperty({
    description: 'The position/role of the employee',
    example: 'Software Engineer',
  })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({
    description: 'The date when the employee joined',
    example: '2023-01-01',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date_joined: Date;
}
