import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

import { BaseModel } from '../core';
import { model as User } from '../user';

@Entity()
export default class Post extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  author: User;
}
