import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Identity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;
}
