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

  @OneToOne(() => User,{
    cascade: true,    //外键对应的数据被删除，这条数据也会被删除
  })
  @JoinColumn({name: 'userNo'})
  user: User;
  
  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  grade: string;

  @Column()
  graduateSchool: string;

  @Column()
  birthDate: string;

  @Column()
  identityNum: string;

  @Column()
  politicalAppearance: string;

  @Column()
  phoneNum: string;

  @Column()
  department: string;

  @Column()
  status: string;

  @Column()
  class: number;
}
