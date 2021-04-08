import User from './domain/user';
import UserMapper from './mapper';

import type { Knex } from 'knex';

export interface UserRepository {
  add(user: User): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  remove(user: User): Promise<void>;
}

export default class Repository implements UserRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async add(user: User): Promise<User> {
    const exists = await this.findByEmail(user.email.inner);

    if (!exists) {
      const data = UserMapper.intoStoreItem(user);
      const [ result ] = await this.db('users').insert(data).returning('*');

      return User.create({
        email: result.email,
        password: result.password,
      }, result.id);
    }

    return null;
  }

  public async findById(id: string): Promise<User> {
    const result = await this.db('users').where({
      id,
    }).first();

    return UserMapper.intoDomain(result);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.db('users').where({
      email,
    }).first();

    if (!result) {
      return undefined;
    }

    return UserMapper.intoDomain(result);
  }

  public async remove(user: User): Promise<void> {
    const userId: string = user.id.inner();
    const exists = await this.findById(userId);

    if (!exists) {
      return null;
    }

    await this.db('users').where({
      id: userId,
    }).delete();
  }
}
