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
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiResponse({
    status: 201,
    description: 'The department has been successfully created.',
    type: Department,
  })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  @ApiResponse({
    status: 200,
    description: 'Return all departments.',
    type: [Department],
  })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a department by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the department.',
    type: Department,
  })
  findOne(@Param('id') id: number) {
    return this.departmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a department' })
  @ApiResponse({
    status: 200,
    description: 'The department has been successfully updated.',
    type: Department,
  })
  update(
    @Param('id') id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department' })
  @ApiResponse({
    status: 200,
    description: 'The department has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.departmentsService.remove(+id);
  }
}
