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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReviewCyclesService } from './review-cycles.service';
import { CreateReviewCycleDto } from './dto/create-review-cycle.dto';
import { UpdateReviewCycleDto } from './dto/update-review-cycle.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('review-cycles')
@Controller('review-cycles')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ReviewCyclesController {
  constructor(private readonly reviewCyclesService: ReviewCyclesService) {}

  @Post()
  @Roles('Admin')
  @ApiOperation({ summary: 'Create a new review cycle' })
  create(@Body() createReviewCycleDto: CreateReviewCycleDto) {
    return this.reviewCyclesService.create(createReviewCycleDto);
  }

  @Get()
  @Roles('Admin', 'Manager')
  @ApiOperation({ summary: 'Get all review cycles' })
  findAll() {
    return this.reviewCyclesService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get a review cycle by id' })
  findOne(@Param('id') id: number) {
    return this.reviewCyclesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Update a review cycle' })
  update(
    @Param('id') id: number,
    @Body() updateReviewCycleDto: UpdateReviewCycleDto,
  ) {
    return this.reviewCyclesService.update(+id, updateReviewCycleDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a review cycle' })
  remove(@Param('id') id: number) {
    return this.reviewCyclesService.remove(+id);
  }
}
