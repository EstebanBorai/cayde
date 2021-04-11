import { v4 as uuid } from 'uuid';

import ID from './id';

/**
 * An Entity ID which is immutable.
 *
 * Once an ID is created it can not be modified, the write access is reserved
 * and only read access is provided
 */
export default class EntityID extends ID {
  constructor(id?: string) {
    super(id || uuid());
  }

  static from(id?: string | EntityID): EntityID {
    if (typeof id === 'string') {
      return new EntityID(id);
    }

    if (id instanceof EntityID) {
      return id;
    }

    return new EntityID();
  }

  public toString(): string {
    return this.idValue();
  }
}
