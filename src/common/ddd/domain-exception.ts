/**
 * An error that may occur in the domain layer of the application
 */
export default class DomainException extends Error {
  constructor(name: string, message: string) {
    super(message);

    console.error('DomainException: ', name, message);

    this.name = name;
  }

  public toString(): string {
    return this.message;
  }
}
