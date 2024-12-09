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
import { Position } from '../../positions/entities/position.entity';
import { Role } from '../../roles/entities/role.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { ReviewRequest } from '../../review-requests/entities/review-request.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ name: 'department_id' })
  department_id: number;

  @Column({ name: 'position_id' })
  position_id: number;

  @Column({ name: 'role_id' })
  role_id: number;

  @ManyToOne(() => Department, (department) => department.employees, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ManyToOne(() => Position, (position) => position.employees, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @ManyToOne(() => Role, (role) => role.employees, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  // Review relationships
  @OneToMany(() => Review, (review) => review.reviewer)
  reviewsGiven: Review[];

  @OneToMany(() => Review, (review) => review.reviewee)
  reviewsReceived: Review[];

  // Review Request relationships
  @OneToMany(() => ReviewRequest, (request) => request.reviewer)
  reviewRequestsToComplete: ReviewRequest[];

  @OneToMany(() => ReviewRequest, (request) => request.reviewee)
  reviewRequestsReceived: ReviewRequest[];

  // Assignment relationships
  @OneToMany(() => Assignment, (assignment) => assignment.manager)
  managedAssignments: Assignment[];

  @OneToMany(() => Assignment, (assignment) => assignment.employee)
  assignments: Assignment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
