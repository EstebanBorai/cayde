import UpdateUserDTO from './update-user-dto';
import { UserRepository } from '../../infrastructure/repository';
import UserID from '../../domain/entity/value-object/user-id';
import User from '../../domain/entity/user';
import UseCase from '../../../../common/ddd/use-case';
import UserNotFoundError from '../../domain/error/user-not-found';

export default class UpdateUserUseCase implements UseCase<UpdateUserDTO, User> {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(input: UpdateUserDTO): Promise<User> {
    const userId = UserID.from(input.id);
    const existentUser = await this.userRepository.findById(userId);

    if (!existentUser) {
      throw new UserNotFoundError();
    }

    const updatedUser = existentUser.update(
      (input as unknown) as Record<string, unknown>,
    );

    return this.userRepository.update(userId, updatedUser);
  }
}
