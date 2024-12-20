import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReviewQuestionsService } from './review-questions.service';
import { CreateReviewQuestionDto } from './dto/create-review-question.dto';
import { UpdateReviewQuestionDto } from './dto/update-review-question.dto';
import { FilterReviewQuestionDto } from './dto/filter-review-question.dto';
import { ReviewQuestion } from './entities/review-question.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('review-questions')
@Controller('review-questions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ReviewQuestionsController {
  constructor(
    private readonly reviewQuestionsService: ReviewQuestionsService,
  ) {}

  @Post()
  @Roles('Admin')
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
  @Roles('Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get all review questions with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'Returns all review questions matching the filter criteria',
    type: [ReviewQuestion],
  })
  findAll(@Query() filters: FilterReviewQuestionDto) {
    return this.reviewQuestionsService.findAll(filters);
  }

  @Get(':id')
  @Roles('Admin', 'Manager', 'Employee')
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
  @Roles('Admin')
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
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a review question' })
  @ApiResponse({
    status: 200,
    description: 'The review question has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.reviewQuestionsService.remove(+id);
  }
}
