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
export class ReviewRequest {
  @PrimaryGeneratedColumn()
  request_id: number;

  @Column({ name: 'reviewee_id' })
  reviewee_id: number;

  @Column({ name: 'reviewer_id' })
  reviewer_id: number;

  @Column({ name: 'cycle_id' })
  cycle_id: number;

  @Column({
    type: 'varchar',
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @ManyToOne(() => Employee, (employee) => employee.reviewRequestsToComplete, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: Employee;

  @ManyToOne(() => Employee, (employee) => employee.reviewRequestsReceived, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'reviewee_id' })
  reviewee: Employee;

  @ManyToOne(() => ReviewCycle, (cycle) => cycle.reviewRequests, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'cycle_id' })
  reviewCycle: ReviewCycle;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
