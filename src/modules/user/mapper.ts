import Mapper from '../../common/ddd/mapper';
import User from './domain/user';
import UserEmail from './domain/user-email';
import UserPassword from './domain/user-password';
import UserDTO from './dto';

export interface UsersTableRow {
  id: string;
  email: string;
  password: string;
}

export interface UserPresentation {
  id: string;
  email: string;
}

const UserMapper: Mapper<User, UserDTO, UsersTableRow, UserPresentation> = {
  intoDTO(domain: User): UserDTO | Promise<UserDTO> {
    return {
      email: domain.email.inner,
    }
  },
  intoStoreItem(domain: User): UsersTableRow | Promise<UsersTableRow> {
    return {
      id: domain.id.inner(),
      email: domain.email.inner,
      password: domain.password.inner,
    }
  },
  intoDomain(raw: Record<string, unknown>): User | Promise<User> {
    const userEmail = UserEmail.fromString(raw.email as string);
    const userPassword = UserPassword.fromString(raw.password as string);
    const user = User.create({
      email: userEmail.unwrap(),
      password: userPassword.unwrap(),
    });

    return user;
  },
  intoPresentation(domain: User): UserPresentation {
    return {
      id: domain.userId,
      email: domain.email.inner,
    }
  }
}

export default UserMapper;
