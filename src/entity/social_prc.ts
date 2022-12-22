//社会实践表
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Social_Prc {
  @PrimaryGeneratedColumn()
  prcNo: number;

  @ManyToOne(() => User, user => user.social_prcs)
  @JoinColumn({ name: 'userNo' })
  user: User;

  @Column()
  stuName: string;

  @Column()
  date: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  result: string;


}