import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { ReviewCycle } from '../../review-cycle/entities/review-cycle.entity';
import { Review } from '../../review/entities/review.entity';

@Entity()
export class ReviewRequest {
  @PrimaryGeneratedColumn()
  request_id: number;

  @Column()
  status: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => Employee, (employee) => employee.reviewRequests)
  @JoinColumn({ name: 'requester_id' })
  requester: Employee;

  @ManyToOne(() => Employee, (employee) => employee.revieweeRequests)
  @JoinColumn({ name: 'reviewee_id' })
  reviewee: Employee;

  @ManyToOne(() => ReviewCycle, (reviewCycle) => reviewCycle.reviewRequests)
  @JoinColumn({ name: 'cycle_id' })
  cycle: ReviewCycle;

  @OneToOne(() => Review)
  @JoinColumn()
  review: Review;
}
