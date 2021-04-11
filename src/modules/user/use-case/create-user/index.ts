import CreateUserUseCase from './create-user-use-case';
import CreateUserController from './create-user-controller';
import UserRepository from '../../infrastructure/repository';

import type { Knex } from 'knex';

export function makeCreateUserUseCaseFromDbConn(dbConn: Knex): CreateUserController {
  const repository = new UserRepository(dbConn);
  const useCase = new CreateUserUseCase(repository);
  const controller = new CreateUserController(useCase);

  return controller;
}
