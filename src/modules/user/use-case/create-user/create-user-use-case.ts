import CreateUserDTO from './create-user-dto';
import { UserRepository } from '../../repository';
import { CreateUserError } from './create-user-error';
import UserEmail from '../../domain/user-email';
import UserPassword from '../../domain/user-password';
import User from '../../domain/user';
import UseCase from '../../../../common/ddd/use-case';
import Result from '../../../../common/primitives/result';
import ApplicationError from '../../../../common/primitives/application-error';
import UserMapper, { UserPresentation } from '../../mapper';

export type Output = Result<UserPresentation, CreateUserError.InvalidEmailAddress
  | CreateUserError.EmailTakenError
  | CreateUserError.InvalidPasswordError | ApplicationError>;

export default class CreateUserUseCase implements UseCase<CreateUserDTO, Output> {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(input: CreateUserDTO): Promise<Output> {
    const email = UserEmail.fromString(input.email);
    const password = UserPassword.fromString(input.password);

    if (email.isErr()) {
      return Result.err(new CreateUserError.InvalidEmailAddress(input.email));
    }

    if (password.isErr()) {
      const errorMessage = password.peekError().unwrap().toString();

      return Result.err(new CreateUserError.InvalidPasswordError(errorMessage));
    }

    try {
      const userEmail = email.unwrap();
      const existentUserWithEmail = await this.userRepository.findByEmail(userEmail.inner);

      if (existentUserWithEmail) {

        return Result.err(new CreateUserError.EmailTakenError(userEmail.inner));
      }

      const user = User.create({
        email: userEmail,
        password: password.unwrap(),
      });

      const entry = await this.userRepository.add(user);
 
      return Result.ok(UserMapper.intoPresentation(entry));
    } catch (error) {
      return Result.err(ApplicationError.from(error));
    }
  }
}
