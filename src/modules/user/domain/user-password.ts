import ValueObject from '../../../common/ddd/value-object';
import { UserDomainError } from './user-domain-exception';

export interface UserPasswordProps {
  password: string;
}

export default class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props);
  }

  private static PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/;

  get value() : string {
    return this.props.password;
  }

  private static isValid(password: string): boolean {
    return UserPassword.PASSWORD_REGEXP.test(password);
  }

  public static fromString(password: string): UserPassword {
    if (UserPassword.isValid(password)) {
      return new UserPassword({ password });
    }

    throw new UserDomainError.InvalidPassword();
  }
}
