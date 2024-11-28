import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReviewCompletion } from '../../review-completion/entities/review-completion.entity';
import { ReviewRequest } from '../../review-request/entities/review-request.entity';

@Entity()
export class ReviewCycle {
  @PrimaryGeneratedColumn()
  cycle_id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  status: string;

  @OneToMany(
    () => ReviewCompletion,
    (reviewCompletion) => reviewCompletion.cycle,
  )
  reviewCompletions: ReviewCompletion[];

  @OneToMany(() => ReviewRequest, (reviewRequest) => reviewRequest.cycle)
  reviewRequests: ReviewRequest[];
}
