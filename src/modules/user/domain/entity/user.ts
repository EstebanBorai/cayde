import AggregateRoot from '../../../../common/ddd/aggregate-root';
import EntityID from '../../../../common/ddd/entity-id';
import UserEmail from './value-object/user-email';
import UserID from './value-object/user-id';
import UserPassword from './value-object/user-password';

interface UserProps {
  email: UserEmail;
  password: UserPassword;
}

export default class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: EntityID) {
    super(props, id);
  }

  get userId(): string {
    return UserID.from(this.entity_id).toString();
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  public static create(props: UserProps, id?: EntityID): User {
    const user = new User({
      ...props,
    }, id);

    return user;
  }
}
