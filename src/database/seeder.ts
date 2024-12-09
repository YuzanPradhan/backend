import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { ConfigModule } from '@nestjs/config';
import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
import { Role } from '../roles/entities/role.entity';
import { DepartmentSeeder } from './department.seeder';
import { PositionSeeder } from './position.seeder';
import { RoleSeeder } from './role.seeder';
import configuration from '../config';

seeder({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      ...configuration().database,
      synchronize: true, // Only for development
      dropSchema: true, // This will drop all tables before seeding
    }),
    TypeOrmModule.forFeature([Department, Position, Role]),
  ],
}).run([DepartmentSeeder, PositionSeeder, RoleSeeder]);
