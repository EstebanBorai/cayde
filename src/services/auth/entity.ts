import { EntitySchema } from 'typeorm';

import { BaseEntity } from '../core';

export class Secret implements Whizzes.Auth.Secret {
  id: string;
  hash: string;
  user: Whizzes.Users.User;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    hash: string,
    user: Whizzes.Users.User,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.hash = hash;
    this.user = user;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default new EntitySchema<Whizzes.Auth.Secret>({
  name: 'secret',
  target: Secret,
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
