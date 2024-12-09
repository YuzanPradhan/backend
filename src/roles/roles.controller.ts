import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'The role has been successfully created.',
    type: Role,
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'Return all roles.',
    type: [Role],
  })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the role.',
    type: Role,
  })
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({
    status: 200,
    description: 'The role has been successfully updated.',
    type: Role,
  })
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({
    status: 200,
    description: 'The role has been successfully deleted.',
  })
  remove(@Param('id') id: number) {
    return this.rolesService.remove(+id);
  }
}
