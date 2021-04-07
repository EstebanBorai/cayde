import ValueObject from '../../../common/ddd/value-object';

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

  public static fromString(email: string): UserEmail {
    throw new Error('Not Implemented');
  }
}
