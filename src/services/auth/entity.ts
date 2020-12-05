import { EntitySchema } from 'typeorm';

import { BaseEntity } from '../core';

export default new EntitySchema<Whizzes.Auth.Secret>({
  name: 'secret',
  columns: {
    ...BaseEntity,
    hash: {
      type: 'varchar',
      length: 256,
      nullable: false,
    },
  },
  relations: {
    user: {
      type: 'one-to-one',
      joinColumn: {
        name: 'user',
        referencedColumnName: 'id',
      },
      target: 'user',
    },
  },
});
