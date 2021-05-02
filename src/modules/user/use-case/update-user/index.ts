import UpdateUserUseCase from './update-user-use-case';
import UpdateUserController from './update-user-controller';
import UserRepository from '../../infrastructure/repository';

import type { Knex } from 'knex';

export function makeUpdaeUserUseCaseFromDbConn(
  dbConn: Knex,
): UpdateUserController {
  const repository = new UserRepository(dbConn);
  const useCase = new UpdateUserUseCase(repository);
  const controller = new UpdateUserController(useCase);

  return controller;
}

export function makeUpdateUserUseCase(
  dbConn: Knex,
): UpdateUserUseCase {
  const repository = new UserRepository(dbConn);
  const useCase = new UpdateUserUseCase(repository);

  return useCase;
}
