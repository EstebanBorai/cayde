import Entity from './entity';
import EntityID from './entity-id';

/**
 * Group multiple Entities and Value Objects together into one unit.
 * 
 * Consumers are not allowed to access Entities or Value Objects directly,
 * the only way to consume such members are by consuming the API of the
 * aggregate
 */
export default class AggregateRoot<T> extends Entity<T> {
  get id(): EntityID {
    return this.entity_id;
  }
}
