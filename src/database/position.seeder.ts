import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Position } from '../positions/entities/position.entity';
import { Department } from '../departments/entities/department.entity';

@Injectable()
export class PositionSeeder implements Seeder {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async seed(): Promise<any> {
    // First, ensure departments exist
    const departments = await this.departmentRepository.find();
    if (departments.length === 0) {
      throw new Error('Departments must be seeded before positions');
    }

    // Create department map for easy lookup
    const departmentMap = new Map(
      departments.map(dept => [dept.department_name, dept.department_id])
    );

    const positions = [
      { 
        position_name: 'HR Manager',
        department_id: departmentMap.get('HR')
      },
      { 
        position_name: 'HR Executive',
        department_id: departmentMap.get('HR')
      },
      { 
        position_name: 'Engineering Lead',
        department_id: departmentMap.get('Engineering')
      },
      { 
        position_name: 'Senior Engineer',
        department_id: departmentMap.get('Engineering')
      },
      { 
        position_name: 'DevOps Engineer',
        department_id: departmentMap.get('DevOps')
      },
      { 
        position_name: 'Senior DevOps Engineer',
        department_id: departmentMap.get('DevOps')
      }
    ];

    // Validate all positions have department_id
    const validPositions = positions.filter(pos => pos.department_id !== undefined);
    if (validPositions.length !== positions.length) {
      throw new Error('All positions must have a valid department_id');
    }

    // Only seed if no positions exist
    const existingPositions = await this.positionRepository.find();
    if (existingPositions.length === 0) {
      await this.positionRepository.save(validPositions);
    }
  }

  async drop(): Promise<any> {
    await this.positionRepository.delete({});
  }
} 