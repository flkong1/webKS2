// 用户表
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Achievement } from './achievement';
import { Extracurricular } from './extracurricular';
import { Social_Prc } from './social_prc';
import { User_Student } from './user_student';

@Entity()
export class User {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn()
  name: number;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Social_Prc, social_prc => social_prc.user)
  social_prcs: Social_Prc[];

  @OneToMany(() => Achievement, achievement => achievement.user)
  achievements: Achievement[];

  @OneToMany(() => Extracurricular, extracurricular => extracurricular.user)
  extracurriculars: Extracurricular[];

  // @Column()
  // type: string;
}
