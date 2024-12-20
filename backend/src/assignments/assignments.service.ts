import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class AssignmentsService {
  private readonly logger = new Logger(AssignmentsService.name);

  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async validateEmployeeRoles(managerId: number, employeeId: number) {
    const manager = await this.employeeRepository.findOne({
      where: { employee_id: managerId },
    });
    const employee = await this.employeeRepository.findOne({
      where: { employee_id: employeeId },
    });

    if (!manager || manager.role_id !== 2) {
      throw new BadRequestException('Invalid manager ID.');
    }

    if (!employee || employee.role_id !== 3) {
      throw new BadRequestException('Invalid employee ID.');
    }

    return { manager, employee };
  }

  async create(createAssignmentDto: CreateAssignmentDto) {
    try {
      // Validate roles first
      await this.validateEmployeeRoles(
        createAssignmentDto.manager_id,
        createAssignmentDto.employee_id,
      );

      // Create new assignment instance
      const newAssignment = this.assignmentRepository.create({
        review_cycle_id: createAssignmentDto.review_cycle_id,
        manager_id: createAssignmentDto.manager_id,
        employee_id: createAssignmentDto.employee_id,
      });

      // Save and return the assignment with relations
      const savedAssignment =
        await this.assignmentRepository.save(newAssignment);

      // Return the assignment with all relations loaded
      return this.findOne(savedAssignment.assignment_id);
    } catch (error) {
      this.logger.error(
        `Failed to create assignment: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.assignmentRepository.find({
        relations: ['reviewCycle', 'manager', 'employee'],
      });
    } catch (error) {
      this.logger.error(`Failed to fetch assignments: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const assignment = await this.assignmentRepository.findOne({
        where: { assignment_id: id },
        relations: ['reviewCycle', 'manager', 'employee'],
      });

      if (!assignment) {
        throw new BadRequestException(`Assignment with ID ${id} not found`);
      }

      return assignment;
    } catch (error) {
      this.logger.error(`Failed to fetch assignment ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    try {
      if (updateAssignmentDto.manager_id || updateAssignmentDto.employee_id) {
        await this.validateEmployeeRoles(
          updateAssignmentDto.manager_id ?? (await this.findOne(id)).manager_id,
          updateAssignmentDto.employee_id ??
            (await this.findOne(id)).employee_id,
        );
      }

      await this.assignmentRepository.update(id, updateAssignmentDto);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Failed to update assignment ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const assignment = await this.findOne(id);
      return await this.assignmentRepository.remove(assignment);
    } catch (error) {
      this.logger.error(`Failed to remove assignment ${id}: ${error.message}`);
      throw error;
    }
  }
}
