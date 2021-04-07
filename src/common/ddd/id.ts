/**
 * Generic ID used application wide.
 * 
 * An ID must be immutable, thus the value is encapsultated.
 */
export default class ID<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  public inner(): T {
    return this.value;
  }

  public isEqual(id?: ID<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (!(id instanceof this.constructor)) {
      return false;
    }

    return id.inner() === this.value;
  }
}
