import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ReviewRequest } from '../../review-request/entities/review-request.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @Column()
  rating: number;

  @Column()
  comments: string;

  @Column()
  created_at: Date;

  @OneToOne(() => ReviewRequest, (reviewRequest) => reviewRequest.review)
  @JoinColumn({ name: 'request_id' })
  reviewRequest: ReviewRequest;
}
