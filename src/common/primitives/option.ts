import Fallible from './fallible';

/**
 * A wrapper for the output of an operation which can have an empty result.
 * 
 * This `Option` implementation its inspired on Rust's `Option` wrapper.
 */
export default class Option<T> extends Fallible<T, unknown> {
  protected _inner: T;

  private constructor(inner?: T) {
    super();

    this._inner = inner;

    Object.freeze(this);
  }

  public static some<T>(inner: T): Option<T> {
    return new Option(inner);
  }

  public static none<T>(): Option<T> {
    return new Option(undefined);
  }

  public isSome(): boolean {
    return this._inner !== null && this._inner !== undefined;
  }

  public isNone(): boolean {
    return this._inner === undefined;
  }
}
