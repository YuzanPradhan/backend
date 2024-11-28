import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewCycleDto {
  @ApiProperty({
    description: 'The start date of the review cycle',
    example: '2023-01-01',
  })
  @Type(() => Date)
  @IsDate()
  start_date: Date;

  @ApiProperty({
    description: 'The end date of the review cycle',
    example: '2023-03-31',
  })
  @Type(() => Date)
  @IsDate()
  end_date: Date;

  @ApiProperty({
    description: 'The status of the review cycle',
    example: 'active',
    enum: ['planned', 'active', 'completed'],
  })
  @IsString()
  @IsIn(['planned', 'active', 'completed'])
  status: string;
}
