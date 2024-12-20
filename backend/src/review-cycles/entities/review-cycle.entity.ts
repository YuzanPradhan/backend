import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { ReviewRequest } from '../../review-requests/entities/review-request.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
export class ReviewCycle {
  @PrimaryGeneratedColumn()
  cycle_id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({
    type: 'varchar',
    enum: ['draft', 'active', 'completed'],
    default: 'draft',
  })
  status: string;

  @OneToMany(() => Assignment, (assignment) => assignment.reviewCycle)
  assignments: Assignment[];

  @OneToMany(() => ReviewRequest, (request) => request.reviewCycle)
  reviewRequests: ReviewRequest[];

  @OneToMany(() => Review, (review) => review.reviewCycle)
  reviews: Review[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
