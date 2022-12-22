//成果奖励表
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn,ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Achievement {
  @PrimaryColumn()
  achieveNo: number;

  @ManyToOne(() => User, user => user.achievements)
  @JoinColumn({ name: 'userNo' })
  user: User;

  @Column()
  date: string;

  @Column()
  title: string;

  @Column()
  result: string;


}