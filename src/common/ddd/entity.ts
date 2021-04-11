import EntityID from './entity-id';

/**
 * An element of the domain model, similar to a domain object.
 * Is a domain model element that represents a domain object. Entites
 * have methods and attributes.
 *
 * Entities are also mutable, different from Value Objects which are inmutable.
 *
 * Entities should have an ID which must be unique and should remain the same
 * during their lifecycle. Two entities are the same if their IDs are the same.
 *
 * Entities have a lifecycle, they are created, during its lifetime an Entity
 * could mutate, by changing an attribute but never its ID. The lifecycle of
 * an Entity ends when the entity is destroyed.
 */
export default abstract class Entity<T> {
  protected readonly entity_id: EntityID;
  public readonly props: T;

  constructor(props: T, id?: EntityID) {
    this.entity_id = id || new EntityID();
    this.props = props;
  }

  /**
   * Checks if the provided object is an instance of an Entity
   */
  public static isEntity(obj: unknown): obj is Entity<unknown> {
    return obj instanceof Entity;
  }

  /**
   * Checks if this Entity instance represents the same `Entity` as the provided
   * `Entity` instance.
   *
   * The comparison of two Entities to be the same is based on the Entity IDs
   * and not the Entity's attributes. If this method is used for value comparison
   * purposes, unexpected results would occur.
   */
  public isEqual(obj: Entity<T>): boolean {
    if (obj === null || obj === undefined) {
      return false;
    }

    if (this === obj) {
      return true;
    }

    if (!Entity.isEntity(obj)) {
      return false;
    }

    return this.entity_id.isEqual(obj.entity_id);
  }
}
