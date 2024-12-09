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
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({
    status: 201,
    description: 'The employee has been successfully created.',
    type: Employee,
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({
    status: 200,
    description: 'Return all employees.',
    type: [Employee],
  })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an employee by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the employee.',
    type: Employee,
  })
  findOne(@Param('id') id: number) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an employee' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully updated.',
    type: Employee,
  })
  update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.employeesService.remove(+id);
  }
}
