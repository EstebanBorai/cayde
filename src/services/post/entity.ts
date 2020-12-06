import { EntitySchema } from 'typeorm';

import { BaseEntity } from '../core';

export class Post implements Whizzes.Posts.Post {
  id: string;
  content: string;
  author: Whizzes.Users.User;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    content: string,
    author: Whizzes.Users.User,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default new EntitySchema<Whizzes.Posts.Post>({
  name: 'post',
  target: Post,
  columns: {
    ...BaseEntity,
    content: {
      type: 'varchar',
      length: 256,
      nullable: false,
    }
  },
  relations: {
    author: {
      type: 'many-to-one',
      joinColumn: {
        name: 'author',
        referencedColumnName: 'id',
      },
      target: 'user',
    },
  },
});
