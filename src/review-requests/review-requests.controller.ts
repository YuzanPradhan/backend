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
import { ReviewRequestsService } from './review-requests.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { UpdateReviewRequestDto } from './dto/update-review-request.dto';
import { ReviewRequest } from './entities/review-request.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('review-requests')
@Controller('review-requests')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ReviewRequestsController {
  constructor(private readonly reviewRequestsService: ReviewRequestsService) {}

  @Get('my-reviews')
  @Roles('Admin', 'Manager', 'Employee')
  @ApiOperation({
    summary: 'Get all review requests assigned to current user',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all review requests where current user is reviewer.',
    type: [ReviewRequest],
  })
  findMyReviewRequests(@GetUser() user: any) {
    return this.reviewRequestsService.findMyReviewRequests(user.employee_id);
  }

  @Get('my-pending-reviews')
  @Roles('Admin', 'Manager', 'Employee')
  @ApiOperation({
    summary: 'Get pending review requests assigned to current user',
  })
  @ApiResponse({
    status: 200,
    description:
      'Return pending review requests where current user is reviewer.',
    type: [ReviewRequest],
  })
  findMyPendingReviews(@GetUser() user: any) {
    return this.reviewRequestsService.findMyPendingReviews(user.employee_id);
  }

  @Post()
  @Roles('Employee')
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
  @Roles('Admin', 'Manager')
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
  @Roles('Admin', 'Manager', 'Employee')
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
  @Roles('Admin', 'Manager')
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
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a review request' })
  @ApiResponse({
    status: 200,
    description: 'The review request has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.reviewRequestsService.remove(+id);
  }
}
