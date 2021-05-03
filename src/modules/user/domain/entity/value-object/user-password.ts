import bcrypt from 'bcrypt';

import ValueObject from '../../../../../common/ddd/value-object';
import InvalidPassword from '../../error/invalid-password';

export interface UserPasswordProps {
  password: string;
}

export default class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props);
  }

  /**
   * (?=.*?[A-Z]) : At least one upper case
   * (?=.*?[a-z]) : At least one lower case
   * (?=.*?[0-9]) : At least one digit
   * (?=.*?[#?!@$ %^&*-]) : At least one special character or space
   * .{8,} : Minimum eight characters
   */
  private static PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  private static SALT_COST_FACTOR = 16;

  get value(): string {
    return this.props.password;
  }

  private static isValid(password: string): boolean {
    return UserPassword.PASSWORD_REGEXP.test(password);
  }

  public static async fromString(password: string): Promise<UserPassword> {
    if (UserPassword.isValid(password)) {
      const hashed = await UserPassword.hash(password);

      return new UserPassword({
        password: hashed,
      });
    }

    throw new InvalidPassword();
  }

  public static isEqual(a: UserPassword, b: UserPassword): boolean {
    return a.value === b.value;
  }

  private static async hash(raw: string): Promise<string> {
    return bcrypt.hash(raw, UserPassword.SALT_COST_FACTOR);
  }

  public async compare(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.props.password);
  }
}
