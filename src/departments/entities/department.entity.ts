import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Position } from '../../positions/entities/position.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column({ unique: true })
  department_name: string;

  @OneToMany(() => Position, (position) => position.department)
  positions: Position[];

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
