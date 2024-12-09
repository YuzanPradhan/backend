import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    const department = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(department);
  }

  findAll() {
    return this.departmentRepository.find({
      relations: ['positions', 'employees'],
    });
  }

  findOne(id: number) {
    return this.departmentRepository.findOne({
      where: { department_id: id },
      relations: ['positions', 'employees'],
    });
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    await this.departmentRepository.update(id, updateDepartmentDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const department = await this.findOne(id);
    return this.departmentRepository.remove(department);
  }
}
