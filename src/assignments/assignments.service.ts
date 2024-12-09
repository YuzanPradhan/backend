import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  create(createAssignmentDto: CreateAssignmentDto) {
    const assignment = this.assignmentRepository.create(createAssignmentDto);
    return this.assignmentRepository.save(assignment);
  }

  findAll() {
    return this.assignmentRepository.find({
      relations: ['reviewCycle', 'manager', 'employee'],
    });
  }

  findOne(id: number) {
    return this.assignmentRepository.findOne({
      where: { assignment_id: id },
      relations: ['reviewCycle', 'manager', 'employee'],
    });
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    await this.assignmentRepository.update(id, updateAssignmentDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const assignment = await this.findOne(id);
    return this.assignmentRepository.remove(assignment);
  }
}
