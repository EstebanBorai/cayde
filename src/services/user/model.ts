import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { BaseModel } from '../core';
import { model as Post } from '../post';

@Entity()
export default class User extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false, unique: true })
  email: string;

  @Column({ length: 100, nullable: false, unique: true })
  name: string;

  @Column({ length: 100, name: 'first_name', nullable: false })
  firstName: string;

  @Column({ length: 100, name: 'surname', nullable: false })
  surname: string;

  @ManyToMany(() => User)
  @JoinTable()
  follows: User[];

  @Column({ name: 'follower_count', default: 0 })
  followerCount: number;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}
