import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewCompletionService } from './review-completion.service';
import { CreateReviewCompletionDto } from './dto/create-review-completion.dto';
import { UpdateReviewCompletionDto } from './dto/update-review-completion.dto';

@Controller('review-completion')
export class ReviewCompletionController {
  constructor(
    private readonly reviewCompletionService: ReviewCompletionService,
  ) {}

  @Post()
  create(@Body() createReviewCompletionDto: CreateReviewCompletionDto) {
    return this.reviewCompletionService.create(createReviewCompletionDto);
  }

  @Get()
  findAll() {
    return this.reviewCompletionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewCompletionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewCompletionDto: UpdateReviewCompletionDto,
  ) {
    return this.reviewCompletionService.update(+id, updateReviewCompletionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewCompletionService.remove(+id);
  }
}
