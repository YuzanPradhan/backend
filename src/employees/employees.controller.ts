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
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('employees')
@Controller('employees')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @Roles('Admin')
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({
    status: 201,
    description: 'The employee has been successfully created.',
    type: Employee,
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists',
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @Roles('Admin', 'Manager')
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({
    status: 200,
    description: 'Return all employees.',
    type: [Employee],
  })
  findAll(@GetUser() user: any) {
    console.log('User role:', user.role);
    return this.employeesService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'Manager', 'Employee')
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
  @Roles('Admin')
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
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete an employee' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.employeesService.remove(+id);
  }

  @Get('profile/me')
  @Roles('Admin', 'Manager', 'Employee')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Return the current user profile.',
    type: Employee,
  })
  getProfile(@GetUser() user: any) {
    return this.employeesService.findOne(user.employee_id);
  }
}
