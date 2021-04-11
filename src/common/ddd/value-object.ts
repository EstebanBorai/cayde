/**
 * Similar to Entity, a ValueObject also have properties and methods.
 * 
 * Attributes of a ValueObject are immutable, this implies that methods
 * on a ValueObject can only be readonly. Commands which change internal
 * state are not allowed.
 * 
 * Value objects don't have neither lifecycle or identify, and are compared
 * to eachother by comparing each of their attributes.
 * 
 * 
 */
export default abstract class ValueObject<T> {
  public readonly props: T;

  constructor(props: T) {
    this.props = {
      ...props,
    };
  }

  /**
   * Compares this `ValueObject` against other by checking on their attributes
   * to be the same
   */
  public isEqual(obj: ValueObject<T>): boolean {
    if (obj === null || obj === undefined) {
      return false;
    }

    if (obj.props === undefined) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(obj.props);
  }
}
