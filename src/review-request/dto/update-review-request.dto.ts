import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateReviewRequestDto {
  @ApiProperty({
    description: 'The ID of the employee requesting the review',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  requester_id?: number;

  @ApiProperty({
    description: 'The ID of the employee to be reviewed',
    example: 2,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  reviewee_id?: number;

  @ApiProperty({
    description: 'The ID of the review cycle',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  cycle_id?: number;

  @ApiProperty({
    description: 'The status of the review request',
    example: 'pending',
    enum: ['pending', 'rejected', 'completed'],
    required: false,
  })
  @IsString()
  @IsIn(['pending', 'rejected', 'accepted'])
  @IsOptional()
  status?: string;
}
