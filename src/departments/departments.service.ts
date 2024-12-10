import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class DepartmentsService extends BaseService<Department> {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {
    super(departmentRepository, 'Department');
  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    await this.checkDuplicate('department_name', createDepartmentDto.department_name);
    const department = this.departmentRepository.create(createDepartmentDto);
    return this.saveEntity(department);
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
