import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ unique: true })
  role_name: string;

  @OneToMany(() => Employee, (employee) => employee.role)
  employees: Employee[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
