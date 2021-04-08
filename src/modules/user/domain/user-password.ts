import ValueObject from '../../../common/ddd/value-object';
import Result from '../../../common/primitives/result';

export interface UserPasswordProps {
  inner: string;
}

export default class UserPassword extends ValueObject<UserPasswordProps> {
  private static PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/;

  get inner() : string {
    return this.props.inner;
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  private static isValid(password: string): boolean {
    // return UserPassword.PASSWORD_REGEXP.test(password);
    return true;
  }

  public static fromString(password: string): Result<UserPassword> {
    if (UserPassword.isValid(password)) {
      return Result.ok(new UserPassword({ inner: password }));
    }

    return Result.err('Invalid password provided. Not secure');
  }
}
