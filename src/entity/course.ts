// 课程表
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryColumn()
  courseNo: number;

  @Column()
  courseName: string;

  @Column()
  credit: number;

  @Column()
  overallHour: number;

  @Column()
  courseType: string;

  @Column()
  department: string;
}
