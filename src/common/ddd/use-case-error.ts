/**
 * A dedicated error structure for use cases
 */
export default class UseCaseError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }

  public static fromString(message: string): UseCaseError {
    return new UseCaseError(message);
  }
}
