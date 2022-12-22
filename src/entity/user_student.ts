// 学生表
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user';
import { Social_Prc } from './social_prc';
import { Achievement } from './achievement';
import { Extracurricular } from './extracurricular';

@Entity()
export class User_Student {
  @PrimaryColumn()
  studentNo: number;

  @OneToOne(() => User)
  @JoinColumn({name: 'userNo'})
  user: User;
  
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
