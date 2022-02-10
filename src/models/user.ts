// setting up modules
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// entity class
@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username!: string;

  @Column()
  password!: string;
};
