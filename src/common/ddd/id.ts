/**
 * Generic ID used application wide.
 *
 * An ID must be immutable, thus the value is encapsultated.
 */
export default class ID {
  protected value: string;

  constructor(value: string) {
    this.value = value;
  }

  public idValue(): string {
    return this.value;
  }

  public isEqual(id?: ID): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (!(id instanceof this.constructor)) {
      return false;
    }

    return id.idValue() === this.value;
  }
}
