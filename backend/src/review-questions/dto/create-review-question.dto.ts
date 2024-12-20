import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { QuestionType } from '../entities/review-question.entity';

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
    description: 'The type of review question (self, peer, or manager)',
    enum: QuestionType,
    example: QuestionType.SELF,
  })
  @IsEnum(QuestionType)
  question_type: QuestionType;

  @ApiProperty({
    description: 'Whether the question is currently active',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
