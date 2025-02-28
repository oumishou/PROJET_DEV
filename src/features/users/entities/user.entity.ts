import { Role } from '../../../core/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
@Unique(['email'])
@Unique(['phone'])
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({
    type: 'simple-array',
  })
  roles: Role[];

  @Exclude()
  @Column()
  token: string;

  @Exclude()
  @Column({ type: 'timestamp' })
  tokenExpires?: Date;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt?: Date;

  @Exclude()
  @DeleteDateColumn()
  public deletedAt?: Date;

  get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}
