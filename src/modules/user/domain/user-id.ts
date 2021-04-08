import Entity from '../../../common/ddd/entity';
import EntityID from '../../../common/ddd/entity-id';


export default class UserID extends Entity<unknown> {
  get id(): EntityID {
    return this.entity_id;
  }

  private constructor(id?: EntityID) {
    super(null, id)
  }

  public static fromEntityID(id?: EntityID): UserID {
    return new UserID(id);
  }
}
