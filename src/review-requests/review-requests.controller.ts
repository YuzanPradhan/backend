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
import { ReviewRequestsService } from './review-requests.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { UpdateReviewRequestDto } from './dto/update-review-request.dto';
import { ReviewRequest } from './entities/review-request.entity';

@ApiTags('review-requests')
@Controller('review-requests')
export class ReviewRequestsController {
  constructor(private readonly reviewRequestsService: ReviewRequestsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review request' })
  @ApiResponse({
    status: 201,
    description: 'The review request has been successfully created.',
    type: ReviewRequest,
  })
  create(@Body() createReviewRequestDto: CreateReviewRequestDto) {
    return this.reviewRequestsService.create(createReviewRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all review requests' })
  @ApiResponse({
    status: 200,
    description: 'Return all review requests.',
    type: [ReviewRequest],
  })
  findAll() {
    return this.reviewRequestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review request by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the review request.',
    type: ReviewRequest,
  })
  findOne(@Param('id') id: number) {
    return this.reviewRequestsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a review request' })
  @ApiResponse({
    status: 200,
    description: 'The review request has been successfully updated.',
    type: ReviewRequest,
  })
  update(
    @Param('id') id: number,
    @Body() updateReviewRequestDto: UpdateReviewRequestDto,
  ) {
    return this.reviewRequestsService.update(+id, updateReviewRequestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review request' })
  @ApiResponse({
    status: 200,
    description: 'The review request has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.reviewRequestsService.remove(+id);
  }
}
