import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class User_Teacher {
  @PrimaryColumn()
  teacherNo: number;

  @OneToOne(() => User)
  @JoinColumn()
  name: User;

  @Column()
  male: string;

  @Column()
  politicalAppearence: string;

  @Column()
  Ethnicity: string;

  @Column()
  academicQualifications: string;

  @Column()
  title: string;

  @Column()
  employmentDate: string;
}
