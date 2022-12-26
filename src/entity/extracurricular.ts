//课外活动表
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Extracurricular {
  @PrimaryGeneratedColumn()
  actNo: number;

  @Column()
  studentNo: number;

  @Column()
  stuName: string;

  @ManyToOne(() => User, user => user.extracurriculars, {
    cascade: true,
  })
  @JoinColumn({ name: 'userNo' })
  user: User;

  @Column()
  date: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  result: string;


}