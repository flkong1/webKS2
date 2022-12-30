// 课程表
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryColumn()
  courseNo: number;

  @Column()
  courseName: string;

  @Column()
  teacherName: string;

  @Column()
  credit: number;

  //学时
  @Column()
  overallHour: number;

  @Column()
  courseType: string;

  @Column()
  department: string;

  @Column()
  grade: string;

  @Column()
  term: string;

  @Column()
  totalStu: string;

  @Column()
  area: string;

  @Column()
  room: string;

  //星期几上课
  @Column()
  day: string;

  //哪个时间段上课
  @Column()
  time: string;
}
