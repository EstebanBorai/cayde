import User from '../domain/entity/user';
import UserMapper, { UsersTableRow } from './mapper';
import UserID from '../domain/entity/value-object/user-id';
import UserEmail from '../domain/entity/value-object/user-email';

import type { Knex } from 'knex';

export interface UserRepository {
  add(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: UserID): Promise<User>;
  findByEmail(email: UserEmail): Promise<User>;
  remove(user: User): Promise<void>;
  update(id: UserID, user: User): Promise<User>;
}

export default class Repository implements UserRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async add(user: User): Promise<User> {
    const exists = await this.findByEmail(user.email);

    if (!exists) {
      const data = UserMapper.intoStoreItem(user);
      const [result] = await this.db('users').insert(data).returning('*');

      return UserMapper.intoDomain(result);
    }

    return null;
  }

  public async findAll(): Promise<User[]> {
    const result = await this.db('users');

    if (result.length === 0) {
      return [];
    }

    return result.map((userRow) => UserMapper.intoDomain(userRow));
  }

  public async findById(id: UserID): Promise<User> {
    const idValue = id.idValue();
    const result = await this.db('users')
      .where({
        id: idValue,
      })
      .first();

    return UserMapper.intoDomain(result);
  }

  public async findByEmail(email: UserEmail): Promise<User | undefined> {
    const emailValue = email.value;
    const result = await this.db('users')
      .where({
        email: emailValue,
      })
      .first();

    if (!result) {
      return undefined;
    }

    return UserMapper.intoDomain(result);
  }

  public async remove(user: User): Promise<void> {
    const exists = await this.findById(user.userId);

    if (!exists) {
      return null;
    }

    await this.db('users')
      .where({
        id: user.userId.idValue(),
      })
      .delete();
  }

  public async update(id: UserID, user: User): Promise<User> {
    const exists = await this.findById(id);

    if (!exists) {
      return null;
    }

    const storeItem = UserMapper.intoStoreItem(user) as UsersTableRow;

    const [result] = await this.db('users')
      .update({
        password: storeItem.password,
      })
      .where({ id: id.idValue() })
      .returning('*');

    const updatedUser = UserMapper.intoDomain(result);

    return updatedUser;
  }
}
