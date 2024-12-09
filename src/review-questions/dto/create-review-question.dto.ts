import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateReviewQuestionDto {
  @ApiProperty({
    description: 'The text of the review question',
    example: "How would you rate the employee's performance?",
  })
  @IsString()
  @IsNotEmpty()
  question_text: string;

  @ApiProperty({
    description: 'The ID of the position this question is for',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  position_id: number;

  @ApiProperty({
    description: 'Whether the question is currently active',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
