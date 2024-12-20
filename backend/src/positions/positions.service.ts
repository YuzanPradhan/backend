import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { Department } from '../departments/entities/department.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { ForeignKeyNotFoundException } from '../common/exceptions/foreign-key-not-found.exception';
import { BaseService } from '../common/base.service';
import { DuplicateEntryException } from '../common/exceptions/duplicate-entry.exception';

@Injectable()
export class PositionsService extends BaseService<Position> {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {
    super(positionRepository, 'Position');
  }

  async create(createPositionDto: CreatePositionDto) {
    // Check for duplicate position name in the same department
    const exists = await this.positionRepository.findOne({
      where: {
        position_name: createPositionDto.position_name,
        department_id: createPositionDto.department_id,
      },
    });
    if (exists) {
      throw new DuplicateEntryException('position_name in department');
    }

    // Check if department exists
    const department = await this.departmentRepository.findOne({
      where: { department_id: createPositionDto.department_id },
    });
    if (!department) {
      throw new ForeignKeyNotFoundException(
        'Department',
        createPositionDto.department_id,
      );
    }

    const position = this.positionRepository.create(createPositionDto);
    return this.saveEntity(position);
  }

  findAll() {
    return this.positionRepository.find({
      relations: ['department', 'employees', 'reviewQuestions'],
    });
  }

  findOne(id: number) {
    return this.positionRepository.findOne({
      where: { position_id: id },
      relations: ['department', 'employees', 'reviewQuestions'],
    });
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    if (updatePositionDto.department_id) {
      const department = await this.departmentRepository.findOne({
        where: { department_id: updatePositionDto.department_id },
      });
      if (!department) {
        throw new ForeignKeyNotFoundException(
          'Department',
          updatePositionDto.department_id,
        );
      }
    }

    await this.positionRepository.update(id, updatePositionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const position = await this.findOne(id);
    return this.positionRepository.remove(position);
  }
}
