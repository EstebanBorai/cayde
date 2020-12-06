import { EntitySchema } from 'typeorm';

import { BaseEntity } from '../core';

export class User implements Whizzes.Users.User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  surname: string;
  follows: Whizzes.Users.User[];
  followerCount: number;
  posts: Whizzes.Posts.Post[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    firstName: string,
    surname: string,
    follows: Whizzes.Users.User[],
    followerCount: number,
    posts: Whizzes.Posts.Post[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.firstName = firstName;
    this.surname = surname;
    this.follows = follows;
    this.followerCount = followerCount;
    this.posts = posts;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default new EntitySchema<Whizzes.Users.User>({
  name: 'user',
  target: User,
  columns: {
    ...BaseEntity,
    email: {
      type: 'varchar',
      length: 100,
      nullable: false,
      unique: true,
    },
    name: {
      type: 'varchar',
      nullable: false,
      unique: true,
      length: 100,
    },
    firstName: {
      type: 'varchar',
      name: 'first_name',
      nullable: false,
      length: 100,
    },
    surname: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    followerCount: {
      type: 'int',
      name: 'follower_count',
      default: 0,
      nullable: false,
    },
  },
  relations: {
    follows: {
      type: 'many-to-many',
      joinTable: true,
      target: 'user',
    },
    posts: {
      type: 'one-to-many',
      target: 'user',
    },
  },
});
