import { EntitySchema } from 'typeorm';

import { BaseEntity } from '../core';

export default new EntitySchema< Whizzes.Posts.Post>({
  name: 'post',
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

