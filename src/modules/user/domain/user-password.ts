import ValueObject from '../../../common/ddd/value-object';

export interface UserPasswordProps {
  inner: string;
}

export default class UserPassword extends ValueObject<UserPasswordProps> {
  private static PASSWORD_REGEXP = /^[A-Za-z0-9]{8,16}/;

  get inner() : string {
    return this.props.inner;
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  private static isValid(password: string): boolean {
    return UserPassword.PASSWORD_REGEXP.test(password);
  }

  public static fromString(password: string): UserPassword {
    throw new Error('Not Implemented');
  }
}
