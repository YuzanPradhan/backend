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

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  assignment_id: number;

  @Column({ name: 'review_cycle_id' })
  review_cycle_id: number;

  @Column({ name: 'manager_id' })
  manager_id: number;

  @Column({ name: 'employee_id' })
  employee_id: number;

  @ManyToOne(() => ReviewCycle, (cycle) => cycle.assignments, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'review_cycle_id' })
  reviewCycle: ReviewCycle;

  @ManyToOne(() => Employee, (employee) => employee.managedAssignments, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'manager_id' })
  manager: Employee;

  @ManyToOne(() => Employee, (employee) => employee.assignments, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
