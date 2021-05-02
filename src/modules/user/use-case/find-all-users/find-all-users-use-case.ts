import { UserRepository } from '../../infrastructure/repository';
import User from '../../domain/entity/user';
import UseCase from '../../../../common/ddd/use-case';

export default class FindAllUsersUseCase implements UseCase<never, User[]> {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
