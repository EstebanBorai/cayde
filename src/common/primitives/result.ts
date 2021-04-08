import Fallible from './fallible';
import Option from './option';

/**
 * A wrapper for the output of an operation which can fail thus resulting in
 * an error which is recoverable/handled.
 * 
 * This `Result` implementation is inspired on Rust's `Result` wrapper.
 */
export default class Result<T, E = any> extends Fallible<T, E> {
  protected _inner: T;
  protected _error: E;

  private constructor(inner?: T, error?: E) {
    super();

    if (error) {
      this._inner = null;
      this._error = error;

      return;
    }

    this._inner = inner;
    this._error = null;

    Object.freeze(this);
  }

  public static ok<T>(inner: T): Result<T> {
    return new Result(inner);
  }

  public static err<T>(error: any): Result<T> {
    return new Result(undefined, error);
  }

  public isOk(): boolean {
    return !!this._error;
  }

  public isErr(): boolean {
    return !!this._error;
  }

  public peekError(): Option<Error> {
    if (this.isErr()) {
      return Option.some(this._error as unknown as Error);
    }

    return Option.none();
  } 
}
