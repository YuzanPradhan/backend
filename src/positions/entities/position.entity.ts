import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { ReviewQuestion } from '../../review-questions/entities/review-question.entity';

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  position_id: number;

  @Column()
  position_name: string;

  @Column({ name: 'department_id', nullable: false })
  department_id: number;

  @ManyToOne(() => Department, (department) => department.positions, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Employee[];

  @OneToMany(() => ReviewQuestion, (question) => question.position)
  reviewQuestions: ReviewQuestion[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
