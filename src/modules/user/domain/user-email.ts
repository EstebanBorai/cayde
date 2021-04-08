import ValueObject from '../../../common/ddd/value-object';
import Result from '../../../common/primitives/result';

export interface UserEmailProps {
  inner: string;
}

export default class UserEmail extends ValueObject<UserEmailProps> {
  private static EMAIL_REGEXP = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  get inner() : string {
    return this.props.inner;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  private static sanitize(email: string): string {
    return email.trim().toLowerCase();
  }

  private static isValid(email: string): boolean {
    return UserEmail.EMAIL_REGEXP.test(email);
  }

  public static fromString(email: string): Result<UserEmail> {
    const sanitized = UserEmail.sanitize(email);

    if (UserEmail.isValid(sanitized)) {
      return Result.ok(new UserEmail({ inner: sanitized }));
    }

    return Result.err('The email provided does\'t have a valid format');
  }
}
