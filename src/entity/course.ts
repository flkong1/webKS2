// 课程表
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryColumn()
  courseNo: number;

  @Column()
  courseName: string;

  @Column()
  teacheName: string;

  @Column()
  credit: number;

  //学时
  @Column()
  overallHour: number;

  // @Column()
  // courseType: string;

  // @Column()
  // department: string;
}
