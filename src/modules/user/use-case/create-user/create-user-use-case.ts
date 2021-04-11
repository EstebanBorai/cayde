import CreateUserDTO from './create-user-dto';
import { UserRepository } from '../../infrastructure/repository';
import UserEmail from '../../domain/entity/value-object/user-email';
import UserPassword from '../../domain/entity/value-object/user-password';
import User from '../../domain/entity/user';
import UseCase from '../../../../common/ddd/use-case';
import EmailTakenError from '../../domain/error/email-taken-error';

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
      throw new EmailTakenError(email.value);
    }

    const user = User.create({
      email,
      password,
    });

    return this.userRepository.add(user);
  }
}
