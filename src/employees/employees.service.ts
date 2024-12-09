import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
import { Role } from '../roles/entities/role.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ForeignKeyNotFoundException } from '../common/exceptions/foreign-key-not-found.exception';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    // Validate foreign keys
    const department = await this.departmentRepository.findOne({
      where: { department_id: createEmployeeDto.department_id },
    });
    if (!department) {
      throw new ForeignKeyNotFoundException(
        'Department',
        createEmployeeDto.department_id,
      );
    }

    const position = await this.positionRepository.findOne({
      where: { position_id: createEmployeeDto.position_id },
    });
    if (!position) {
      throw new ForeignKeyNotFoundException(
        'Position',
        createEmployeeDto.position_id,
      );
    }

    const role = await this.roleRepository.findOne({
      where: { role_id: createEmployeeDto.role_id },
    });
    if (!role) {
      throw new ForeignKeyNotFoundException('Role', createEmployeeDto.role_id);
    }

    // Create employee with all required fields
    const employee = this.employeeRepository.create({
      first_name: createEmployeeDto.first_name,
      last_name: createEmployeeDto.last_name,
      department_id: createEmployeeDto.department_id,
      position_id: createEmployeeDto.position_id,
      role_id: createEmployeeDto.role_id,
    });

    return this.employeeRepository.save(employee);
  }

  findAll() {
    return this.employeeRepository.find({
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

  findOne(id: number) {
    return this.employeeRepository.findOne({
      where: { employee_id: id },
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
    // First validate foreign keys
    if (updateEmployeeDto.department_id) {
      const department = await this.departmentRepository.findOne({
        where: { department_id: updateEmployeeDto.department_id },
      });
      if (!department) {
        throw new ForeignKeyNotFoundException(
          'Department',
          updateEmployeeDto.department_id,
        );
      }
    }

    if (updateEmployeeDto.position_id) {
      const position = await this.positionRepository.findOne({
        where: { position_id: updateEmployeeDto.position_id },
      });
      if (!position) {
        throw new ForeignKeyNotFoundException(
          'Position',
          updateEmployeeDto.position_id,
        );
      }
    }

    if (updateEmployeeDto.role_id) {
      const role = await this.roleRepository.findOne({
        where: { role_id: updateEmployeeDto.role_id },
      });
      if (!role) {
        throw new ForeignKeyNotFoundException(
          'Role',
          updateEmployeeDto.role_id,
        );
      }
    }

    // Create an object with only the updatable fields
    const updateData = {
      ...(updateEmployeeDto.first_name && {
        first_name: updateEmployeeDto.first_name,
      }),
      ...(updateEmployeeDto.last_name && {
        last_name: updateEmployeeDto.last_name,
      }),
      ...(updateEmployeeDto.department_id && {
        department_id: updateEmployeeDto.department_id,
      }),
      ...(updateEmployeeDto.position_id && {
        position_id: updateEmployeeDto.position_id,
      }),
      ...(updateEmployeeDto.role_id && { role_id: updateEmployeeDto.role_id }),
    };

    await this.employeeRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    return this.employeeRepository.remove(employee);
  }
}
