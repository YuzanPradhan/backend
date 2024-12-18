import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
import { Role } from '../roles/entities/role.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { BaseService } from '../common/base.service';
import { ForeignKeyNotFoundException } from '../common/exceptions/foreign-key-not-found.exception';

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
    // Check for duplicate email
    await this.checkDuplicate('email', createEmployeeDto.email);

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

    const employee = this.repository.create(createEmployeeDto);
    return this.saveEntity(employee);
  }

  async findAll() {
    console.log('Finding all employees');
    return this.executeOperation(async () => {
      try {
        // First get employees with basic relations
        const queryBuilder = this.repository
          .createQueryBuilder('employee')
          .leftJoinAndSelect('employee.department', 'department')
          .leftJoinAndSelect('employee.position', 'position')
          .leftJoinAndSelect('employee.role', 'role');

        const employees = await queryBuilder.getMany();

        // Then load reviews and other relations separately to handle potential invalid ratings
        for (const employee of employees) {
          try {
            await this.repository
              .createQueryBuilder()
              .relation(Employee, 'reviewsGiven')
              .of(employee)
              .loadMany();

            await this.repository
              .createQueryBuilder()
              .relation(Employee, 'reviewsReceived')
              .of(employee)
              .loadMany();

            await this.repository
              .createQueryBuilder()
              .relation(Employee, 'reviewRequestsToComplete')
              .of(employee)
              .loadMany();

            await this.repository
              .createQueryBuilder()
              .relation(Employee, 'reviewRequestsReceived')
              .of(employee)
              .loadMany();

            await this.repository
              .createQueryBuilder()
              .relation(Employee, 'managedAssignments')
              .of(employee)
              .loadMany();

            await this.repository
              .createQueryBuilder()
              .relation(Employee, 'assignments')
              .of(employee)
              .loadMany();
          } catch (error) {
            console.warn(
              `Failed to load some relations for employee ${employee.employee_id}:`,
              error.message,
            );
            // Continue loading other employees even if one fails
          }
        }

        console.log('Found employees:', JSON.stringify(employees, null, 2));
        return employees;
      } catch (error) {
        console.error('Error in findAll:', error);
        throw error;
      }
    });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { employee_id: id },
      relations: ['role', 'department'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
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
    console.log('Finding employee by email:', email);
    const employee = await this.executeOperation(() =>
      this.repository.findOne({
        where: { email },
        relations: ['role'],
        select: {
          employee_id: true,
          first_name: true,
          last_name: true,
          email: true,
          password: true,
          role: {
            role_id: true,
            role_name: true,
          },
        },
      }),
    );
    console.log('Found employee:', employee);
    return employee;
  }

  async getProfile(employeeId: number) {
    return this.executeOperation(() =>
      this.repository.findOne({
        where: { employee_id: employeeId },
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
        select: {
          employee_id: true,
          first_name: true,
          last_name: true,
          email: true,
          department_id: true,
          position_id: true,
          role_id: true,
          created_at: true,
          updated_at: true,
          department: {
            department_id: true,
            department_name: true,
          },
          position: {
            position_id: true,
            position_name: true,
          },
          role: {
            role_id: true,
            role_name: true,
          },
        },
      }),
    );
  }
}
