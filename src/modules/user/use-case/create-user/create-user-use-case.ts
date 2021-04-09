import CreateUserDTO from './create-user-dto';
import { UserRepository } from '../../repository';
import { CreateUserError } from './create-user-error';
import UserEmail from '../../domain/user-email';
import UserPassword from '../../domain/user-password';
import User from '../../domain/user';
import UseCase from '../../../../common/ddd/use-case';

export default class CreateUserUseCase implements UseCase<CreateUserDTO, User> {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(input: CreateUserDTO): Promise<User> {
    const email = UserEmail.fromString(input.email);
    const password = UserPassword.fromString(input.password);
    const emailIsTaken = await this.userRepository.findByEmail(email.value);

    if (emailIsTaken) {
      throw new CreateUserError.EmailTakenError(email.value);
    }

    const user = User.create({
      email,
      password,
    });

    return this.userRepository.add(user);
  }
}
