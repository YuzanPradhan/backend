import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsIn, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateReviewCycleDto {
  @ApiProperty({
    description: 'The start date of the review cycle',
    example: '2023-01-01',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  start_date?: Date;

  @ApiProperty({
    description: 'The end date of the review cycle',
    example: '2023-03-31',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  end_date?: Date;

  @ApiProperty({
    description: 'The status of the review cycle',
    example: 'active',
    enum: ['planned', 'active', 'completed'],
    required: false,
  })
  @IsString()
  @IsIn(['planned', 'active', 'completed'])
  @IsOptional()
  status?: string;
}
