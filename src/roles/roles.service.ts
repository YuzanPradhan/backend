import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find({
      relations: ['employees'],
    });
  }

  findOne(id: number) {
    return this.roleRepository.findOne({
      where: { role_id: id },
      relations: ['employees'],
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.roleRepository.update(id, updateRoleDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    return this.roleRepository.remove(role);
  }
}
