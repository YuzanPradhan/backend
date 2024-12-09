import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Position } from '../../positions/entities/position.entity';

@Entity()
export class ReviewQuestion {
  @PrimaryGeneratedColumn()
  question_id: number;

  @Column('text')
  question_text: string;

  @Column({ name: 'position_id' })
  position_id: number;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Position, (position) => position.reviewQuestions, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
