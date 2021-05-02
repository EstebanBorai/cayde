import FindAllUsersUseCase from './find-all-users-use-case';
import UserRepository from '../../infrastructure/repository';

import type { Knex } from 'knex';
import type FindAllUsersUseCaseType from './find-all-users-use-case';

export function makeFindAllUseCase(
  dbConn: Knex,
): FindAllUsersUseCaseType {
  const repository = new UserRepository(dbConn);
  const useCase = new FindAllUsersUseCase(repository);

  return useCase;
}
