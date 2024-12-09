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
import { ReviewCyclesService } from './review-cycles.service';
import { CreateReviewCycleDto } from './dto/create-review-cycle.dto';
import { UpdateReviewCycleDto } from './dto/update-review-cycle.dto';
import { ReviewCycle } from './entities/review-cycle.entity';

@ApiTags('review-cycles')
@Controller('review-cycles')
export class ReviewCyclesController {
  constructor(private readonly reviewCyclesService: ReviewCyclesService) {}

  @Post()
  create(@Body() createReviewCycleDto: CreateReviewCycleDto) {
    return this.reviewCyclesService.create(createReviewCycleDto);
  }

  @Get()
  findAll() {
    return this.reviewCyclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reviewCyclesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateReviewCycleDto: UpdateReviewCycleDto,
  ) {
    return this.reviewCyclesService.update(+id, updateReviewCycleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reviewCyclesService.remove(+id);
  }
}
