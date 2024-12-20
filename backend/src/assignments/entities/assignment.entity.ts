import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { ReviewCycle } from '../../review-cycles/entities/review-cycle.entity';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  assignment_id: number;

  @Column({ name: 'review_cycle_id', type: 'int' })
  review_cycle_id: number;

  @Column({ name: 'manager_id', type: 'int' })
  manager_id: number;

  @Column({ name: 'employee_id', type: 'int' })
  employee_id: number;

  @ManyToOne(() => ReviewCycle, (cycle) => cycle.assignments, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'review_cycle_id' })
  reviewCycle: ReviewCycle;

  @ManyToOne(() => Employee, (employee) => employee.managedAssignments, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'manager_id' })
  manager: Employee;

  @ManyToOne(() => Employee, (employee) => employee.assignments, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
