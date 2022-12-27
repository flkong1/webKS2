//成果奖励表
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn,ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Achievement {
  @PrimaryColumn()
  achieveNo: number;

  @Column()
  studentNo: number;

  @Column()
  stuName: string;

  @ManyToOne(() => User, user => user.achievements, {
    onDelete: 'CASCADE',
    // cascade: true,
  })
  @JoinColumn({ name: 'userNo' })
  user: User;

  @Column()
  grade: string;

  @Column()
  department: string;

  @Column()
  date: string;

  @Column()
  title: string;

  @Column()
  result: string;


}