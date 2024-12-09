import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
import { Role } from '../roles/entities/role.entity';
import { Employee } from '../employees/entities/employee.entity';

export default () => ({
  database: {
    type: 'postgres' as const,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Department, Position, Role, Employee],
    synchronize: process.env.NODE_ENV !== 'production',
    autoLoadEntities: true,
  } satisfies TypeOrmModuleOptions,
});
