//课外活动表
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn,ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Extracurricular {
  @PrimaryColumn()
  actNo: number;

  @ManyToOne(() => User, user => user.extracurriculars)
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