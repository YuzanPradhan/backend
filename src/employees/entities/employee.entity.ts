import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { ReviewCompletion } from '../../review-completion/entities/review-completion.entity';
import { ReviewRequest } from '../../review-request/entities/review-request.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Employee {
  @ApiProperty({
    description: 'The unique identifier of the employee',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  employee_id: number;

  @ApiProperty({
    description: 'The name of the employee',
    example: 'John Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The email address of the employee',
    example: 'john.doe@example.com',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'The position/role of the employee',
    example: 'Software Engineer',
  })
  @Column()
  position: string;

  @ApiProperty({
    description: 'The date when the employee joined',
    example: '2023-01-01',
  })
  @Column()
  date_joined: Date;

  @ApiProperty({
    description: 'The department details',
    type: () => Department,
  })
  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ApiProperty({
    description: 'List of review completions',
    type: () => [ReviewCompletion],
  })
  @OneToMany(
    () => ReviewCompletion,
    (reviewCompletion) => reviewCompletion.employee,
  )
  reviewCompletions: ReviewCompletion[];

  @ApiProperty({
    description: 'List of review requests made by the employee',
    type: () => [ReviewRequest],
  })
  @OneToMany(() => ReviewRequest, (reviewRequest) => reviewRequest.requester)
  reviewRequests: ReviewRequest[];

  @ApiProperty({
    description: 'List of review requests where the employee is being reviewed',
    type: () => [ReviewRequest],
  })
  @OneToMany(() => ReviewRequest, (reviewRequest) => reviewRequest.reviewee)
  revieweeRequests: ReviewRequest[];
}
