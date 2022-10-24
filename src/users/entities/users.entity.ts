import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from 'src/shared/interfaces/user.interface';

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: number | string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;
}
