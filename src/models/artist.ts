// setting up modules
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// entity class
@Entity({name: 'artists'})
export class Artist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;
};
