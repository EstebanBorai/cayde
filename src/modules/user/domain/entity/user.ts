import AggregateRoot from '../../../../common/ddd/aggregate-root';
import EntityID from '../../../../common/ddd/entity-id';
import PasswordDoesntMatch from '../error/password-doesnt-match';
import UserEmail from './value-object/user-email';
import UserID from './value-object/user-id';
import UserPassword from './value-object/user-password';

interface UserProps {
  email: UserEmail;
  password: UserPassword;
}

export default class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: EntityID | string) {
    const entityId = EntityID.from(id);

    super(props, entityId);
  }

  get userId(): UserID {
    return UserID.from(this.entity_id);
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  public static create(props: UserProps, id?: EntityID | string): User {
    const user = new User(
      {
        ...props,
      },
      id,
    );

    return user;
  }

  public update(props: Record<string, unknown>): User {
    let userPassword: UserPassword | null = null;

    if (props.password) {
      const password = UserPassword.fromString(props.password as string);
      const repeatPassword = UserPassword.fromString(
        props.repeatPassword as string,
      );

      if (!password.isEqual(repeatPassword)) {
        throw new PasswordDoesntMatch();
      }

      userPassword = password;
    }

    return User.create(
      {
        email: this.email,
        password: userPassword || this.password,
      },
      this.userId,
    );
  }
}
