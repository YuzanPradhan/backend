import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { ReviewCycle } from '../../review-cycle/entities/review-cycle.entity';

@Entity()
export class ReviewCompletion {
  @PrimaryGeneratedColumn()
  completion_id: number;

  @Column()
  employee_id: number;

  @Column()
  cycle_id: number;

  @Column()
  completion_percentage: number;

  @ManyToOne(() => Employee, (employee) => employee.reviewCompletions)
  employee: Employee;

  @ManyToOne(() => ReviewCycle, (reviewCycle) => reviewCycle.reviewCompletions)
  cycle: ReviewCycle;
}
