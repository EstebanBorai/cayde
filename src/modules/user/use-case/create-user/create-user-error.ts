import UseCaseError from '../../../../common/ddd/use-case-error';

export namespace CreateUserError {
  export class InvalidEmailAddress extends UseCaseError {
    constructor(email: string) {
      super(`The email ${email} is not a valid email address`);
    }
  }
  export class EmailTakenError extends UseCaseError {
    constructor(email: string) {
      super(`The email ${email} is already taken`);
    }
  }

  export class InvalidPasswordError extends UseCaseError {
    constructor(message: string) {
      super(message);
    }
  }
}
