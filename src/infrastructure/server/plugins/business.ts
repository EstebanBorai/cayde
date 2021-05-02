import fp from 'fastify-plugin';

import { makeCreateUserUseCase, makeCreateUserUseCaseFromDbConn } from '../../../modules/user/use-case/create-user';
import { makeUpdateUserUseCase, makeUpdaeUserUseCaseFromDbConn } from '../../../modules/user/use-case/update-user';
import { makeFindAllUseCase } from '../../../modules/user/use-case/find-all-users';

import type { FastifyInstance } from 'fastify';
import type CreateUserController from '../../../modules/user/use-case/create-user/create-user-controller';
import type UpdateUserController from '../../../modules/user/use-case/update-user/update-user-controller';
import type FindAllUsersUseCase from '../../../modules/user/use-case/find-all-users/find-all-users-use-case';
import type CreateUserUseCase from '../../../modules/user/use-case/create-user/create-user-use-case';
import type UpdateUserUseCase from '../../../modules/user/use-case/update-user/update-user-use-case';

export interface Business {
  useCase: {
    user: {
      createUser: CreateUserUseCase;
      findAll: FindAllUsersUseCase;
      updateUser: UpdateUserUseCase;
    }
  },
}

async function businessPlugin(
  fastify: FastifyInstance,
  _: unknown,
  next: (err?: Error) => void,
) {
  const business: Business = {
    useCase: {
      user: {
        createUser: makeCreateUserUseCase(fastify.knex),
        findAll: makeFindAllUseCase(fastify.knex),
        updateUser: makeUpdateUserUseCase(fastify.knex),
      }
    }
  };

  fastify.decorate('business', business);

  next();
}

export default fp(businessPlugin, {
  fastify: '3.x',
  name: 'business-plugin',
  dependencies: ['knex-fastify-plugin'],
});
