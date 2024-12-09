import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { ReviewCycle } from '../../review-cycles/entities/review-cycle.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @Column({ name: 'reviewer_id' })
  reviewer_id: number;

  @Column({ name: 'reviewee_id' })
  reviewee_id: number;

  @Column({ name: 'cycle_id' })
  cycle_id: number;

  @Column('jsonb')
  questions_and_answers: object;

  @ManyToOne(() => Employee, (employee) => employee.reviewsGiven, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: Employee;

  @ManyToOne(() => Employee, (employee) => employee.reviewsReceived, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'reviewee_id' })
  reviewee: Employee;

  @ManyToOne(() => ReviewCycle, (cycle) => cycle.reviews, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'cycle_id' })
  reviewCycle: ReviewCycle;

  @CreateDateColumn()
  created_at: Date;
}
