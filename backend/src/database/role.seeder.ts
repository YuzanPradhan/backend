import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed(): Promise<any> {
    const roles = [
      {
        role_name: 'Admin',
      },
      {
        role_name: 'Manager',
      },
      {
        role_name: 'Employee',
      },
    ];

    const existingRoles = await this.roleRepository.find();
    if (existingRoles.length === 0) {
      for (const role of roles) {
        await this.roleRepository.save(role);
      }
    }
  }

  async drop(): Promise<any> {
    await this.roleRepository.delete({});
  }
}
