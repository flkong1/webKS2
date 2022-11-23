// 学生表
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class User_Student {
  @PrimaryColumn()
  studentNo: string;

  // @OneToOne(() => User)
  // @JoinColumn()
  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  graduateSchool: string;

  @Column()
  birthDate: string;

  @Column()
  identityNum: string;

  @Column()
  politicalAppearence: string;

  @Column()
  phoneNum: string;

  @Column()
  department: string;

  @Column()
  status: string;

  @Column()
  class: number;
}
