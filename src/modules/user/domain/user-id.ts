import EntityID from '../../../common/ddd/entity-id';


export default class UserID extends EntityID {
  private constructor(id?: string) {
    super(id)
  }
}
