import ValueObject from '../../../../../common/ddd/value-object';
import InvalidEmailFormat from '../../error/invalid-email-format';

export interface UserEmailProps {
  email: string;
}

export default class UserEmail extends ValueObject<UserEmailProps> {
  private constructor(props: UserEmailProps) {
    super(props);
  }

  private static EMAIL_REGEXP = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  get value(): string {
    return this.props.email;
  }

  private static sanitize(email: string): string {
    return email.trim().toLowerCase();
  }

  private static isValid(email: string): boolean {
    return UserEmail.EMAIL_REGEXP.test(email);
  }

  public static fromString(email: string): UserEmail {
    const sanitized = UserEmail.sanitize(email);

    if (UserEmail.isValid(sanitized)) {
      return new UserEmail({ email: sanitized });
    }

    throw new InvalidEmailFormat(email);
  }
}
