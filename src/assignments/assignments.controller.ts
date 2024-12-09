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
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';

@ApiTags('assignments')
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new assignment' })
  @ApiResponse({
    status: 201,
    description: 'The assignment has been successfully created.',
    type: Assignment,
  })
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all assignments' })
  @ApiResponse({
    status: 200,
    description: 'Return all assignments.',
    type: [Assignment],
  })
  findAll() {
    return this.assignmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an assignment by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the assignment.',
    type: Assignment,
  })
  findOne(@Param('id') id: number) {
    return this.assignmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an assignment' })
  @ApiResponse({
    status: 200,
    description: 'The assignment has been successfully updated.',
    type: Assignment,
  })
  update(
    @Param('id') id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentsService.update(+id, updateAssignmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an assignment' })
  @ApiResponse({
    status: 200,
    description: 'The assignment has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.assignmentsService.remove(+id);
  }
}
