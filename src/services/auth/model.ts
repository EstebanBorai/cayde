import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

import { BaseModel } from '../core';
import { model as User } from '../user';

@Entity()
export default class Secret extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hash: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
