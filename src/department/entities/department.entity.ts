import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column()
  department_name: string;

  @Column()
  department_head_id: number;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
