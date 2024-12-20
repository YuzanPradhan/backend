import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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
  private readonly logger = new Logger(EmployeesService.name);

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
    try {
      // Try with minimal relations first to isolate the issue
      return await this.repository.find({
        relations: ['department', 'position', 'role'],
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
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch employees: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to fetch employees');
    }
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
    return this.executeOperation(() =>
      this.repository.findOne({
        where: { email },
        relations: ['role'],
      }),
    );
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
