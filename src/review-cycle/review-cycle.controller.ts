import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewCycleService } from './review-cycle.service';
import { CreateReviewCycleDto } from './dto/create-review-cycle.dto';
import { UpdateReviewCycleDto } from './dto/update-review-cycle.dto';

@Controller('review-cycle')
export class ReviewCycleController {
  constructor(private readonly reviewCycleService: ReviewCycleService) {}

  @Post()
  create(@Body() createReviewCycleDto: CreateReviewCycleDto) {
    return this.reviewCycleService.create(createReviewCycleDto);
  }

  @Get()
  findAll() {
    return this.reviewCycleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewCycleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewCycleDto: UpdateReviewCycleDto,
  ) {
    return this.reviewCycleService.update(+id, updateReviewCycleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewCycleService.remove(+id);
  }
}
