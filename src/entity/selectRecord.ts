//选课记录表
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn,ManyToOne } from 'typeorm';
import { User_Student } from './user_student';

@Entity()
export class SelectRecord {
  @PrimaryGeneratedColumn()
  recordNo: number;

  @Column()
  studentNo: number;
  @ManyToOne(() => User_Student, user_student => user_student.selectRecords, {
    // cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studentNo' })
  user_student: User_Student;

  @Column()
  studentName: string;

  @Column()
  teacherName: string;

  @Column()
  score: string;



}