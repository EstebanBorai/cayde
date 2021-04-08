import UseCaseError from '../ddd/use-case-error';

export default class ApplicationError extends UseCaseError {
  private error: string | Error;

  private constructor(error: string | Error) {
    super(error.toString());

    this.error = error;

    console.error(error);
  }

  public static from(err: Error) {
    return new ApplicationError(err);
  }

  public msg(): string {
    return this.error.toString();
  }
}
