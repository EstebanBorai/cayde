import CreateUserDTO from './create-user-dto';
import { UserRepository } from '../../repository';
import { CreateUserError } from './create-user-error';
import UserEmail from '../../domain/user-email';
import UserPassword from '../../domain/user-password';
import User from '../../domain/user';
import UseCase from '../../../../common/ddd/use-case';

type Output = User
  | CreateUserError.EmailTakenError
  | CreateUserError.InvalidPasswordError;

export default class CreateUserUseCase implements UseCase<CreateUserDTO, Output> {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(input: CreateUserDTO): Promise<Output> {
    const email = UserEmail.fromString(input.email);
    const password = UserPassword.fromString(input.password);

    try {
      const existentUserWithEmail = await this.userRepository.findByEmail(email.inner);

      if (existentUserWithEmail) {
        return new CreateUserError.EmailTakenError(email.inner);
      }

      const user = User.create({
        email,
        password,
      });

      const entry = this.userRepository.add(user);

      return entry;
    } catch (error) {
      console.error(error);

      return;
    }
  }
}
