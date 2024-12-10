import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('reviews')
@Controller('reviews')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Roles('Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
    type: Review,
  })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @Roles('Admin', 'Manager')
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({
    status: 200,
    description: 'Return all reviews.',
    type: [Review],
  })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get a review by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the review.',
    type: Review,
  })
  @ApiResponse({
    status: 404,
    description: 'Review not found.',
  })
  findOne(@Param('id') id: number) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Update a review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully updated.',
    type: Review,
  })
  update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.reviewsService.remove(+id);
  }
}
