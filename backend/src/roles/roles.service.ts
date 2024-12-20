import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { BaseService } from '../common/base.service';

@Injectable()
export class RolesService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
    super(roleRepository, 'Role');
  }

  async create(createRoleDto: CreateRoleDto) {
    await this.checkDuplicate('role_name', createRoleDto.role_name);
    const role = this.repository.create(createRoleDto);
    return this.saveEntity(role);
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
