export default abstract class Fallible<T, E> {
  protected _inner: T;
  protected _error: E;

  /**
   * Unwraps and returns either the underlyig value if the wrapper contains a
   * empty error or throws if this `Fallible` wrapper contains an error.
   */
  public unwrap(): T {
    if (this._error) {
      throw new Error('Called "unwrap" on Fallible with error\n' + this._error.toString());
    }
  
    return this._inner;
  }
}
