import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
import { Role } from '../roles/entities/role.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class EmployeesService extends BaseService<Employee> {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
    super(employeeRepository, 'Employee');
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.executeOperation(async () => {
      const employee = this.repository.create(createEmployeeDto);
      return await this.saveEntity(employee);
    });
  }

  async findAll() {
    return this.executeOperation(() =>
      this.repository.find({
        relations: [
          'department',
          'position',
          'role',
          'reviewsGiven',
          'reviewsReceived',
          'reviewRequestsToComplete',
          'reviewRequestsReceived',
          'managedAssignments',
          'assignments',
        ],
      }),
    );
  }

  async findOne(id: number) {
    return this.findOneOrFail(id, {
      relations: [
        'department',
        'position',
        'role',
        'reviewsGiven',
        'reviewsReceived',
        'reviewRequestsToComplete',
        'reviewRequestsReceived',
        'managedAssignments',
        'assignments',
      ],
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.executeOperation(async () => {
      await this.findOneOrFail(id);
      return await this.updateEntity(id, updateEmployeeDto);
    });
  }

  async remove(id: number) {
    return this.removeEntity(id);
  }

  async findByEmail(email: string) {
    return this.executeOperation(() =>
      this.repository.findOne({
        where: { email },
        relations: ['role'],
      }),
    );
  }
}
