import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReviewQuestionsService } from './review-questions.service';
import { CreateReviewQuestionDto } from './dto/create-review-question.dto';
import { UpdateReviewQuestionDto } from './dto/update-review-question.dto';
import { ReviewQuestion } from './entities/review-question.entity';

@ApiTags('review-questions')
@Controller('review-questions')
export class ReviewQuestionsController {
  constructor(
    private readonly reviewQuestionsService: ReviewQuestionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review question' })
  @ApiResponse({
    status: 201,
    description: 'The review question has been successfully created.',
    type: ReviewQuestion,
  })
  create(@Body() createReviewQuestionDto: CreateReviewQuestionDto) {
    return this.reviewQuestionsService.create(createReviewQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all review questions' })
  @ApiResponse({
    status: 200,
    description: 'Return all review questions.',
    type: [ReviewQuestion],
  })
  findAll() {
    return this.reviewQuestionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review question by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the review question.',
    type: ReviewQuestion,
  })
  findOne(@Param('id') id: number) {
    return this.reviewQuestionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a review question' })
  @ApiResponse({
    status: 200,
    description: 'The review question has been successfully updated.',
    type: ReviewQuestion,
  })
  update(
    @Param('id') id: number,
    @Body() updateReviewQuestionDto: UpdateReviewQuestionDto,
  ) {
    return this.reviewQuestionsService.update(+id, updateReviewQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review question' })
  @ApiResponse({
    status: 200,
    description: 'The review question has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.reviewQuestionsService.remove(+id);
  }
}
