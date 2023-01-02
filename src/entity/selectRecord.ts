//选课记录表
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn,ManyToOne } from 'typeorm';
import { User_Student } from './user_student';
import { Course } from './course';

@Entity()
export class SelectRecord {
  @PrimaryGeneratedColumn()
  recordNo: number;


  //跟学生表多对一
  @ManyToOne(() => User_Student, user_student => user_student.selectRecords, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'studentNo' })
  student: User_Student;

  //跟课程表多对一
  @ManyToOne(() => Course, course => course.selectRecords, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'courseNo' })
  course: Course;

  @Column()
  score: number;

  @Column()
  label: string;



}