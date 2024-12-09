import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Department } from '../departments/entities/department.entity';

@Injectable()
export class DepartmentSeeder implements Seeder {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async seed(): Promise<any> {
    const departments = [
      { department_name: 'HR' },
      { department_name: 'Engineering' },
      { department_name: 'DevOps' },
      { department_name: 'Mobile' },
      { department_name: 'Full-Stack' },
    ];

    const existingDepartments = await this.departmentRepository.find();
    if (existingDepartments.length === 0) {
      for (const department of departments) {
        await this.departmentRepository.save(department);
      }
    }
  }

  async drop(): Promise<any> {
    await this.departmentRepository.delete({});
  }
} 