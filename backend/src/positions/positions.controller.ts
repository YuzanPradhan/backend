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
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('positions')
@Controller('positions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @Roles('Admin')
  @ApiOperation({ summary: 'Create a new position' })
  @ApiResponse({
    status: 201,
    description: 'The position has been successfully created.',
    type: Position,
  })
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  @Roles('Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get all positions' })
  @ApiResponse({
    status: 200,
    description: 'Return all positions.',
    type: [Position],
  })
  findAll() {
    return this.positionsService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get a position by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the position.',
    type: Position,
  })
  findOne(@Param('id') id: number) {
    return this.positionsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Update a position' })
  @ApiResponse({
    status: 200,
    description: 'The position has been successfully updated.',
    type: Position,
  })
  update(
    @Param('id') id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionsService.update(+id, updatePositionDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a position' })
  @ApiResponse({
    status: 200,
    description: 'The position has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.positionsService.remove(+id);
  }
}
