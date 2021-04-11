import fp from 'fastify-plugin';

import { makeCreateUserUseCaseFromDbConn } from '../../../modules/user/use-case/create-user';

import type { FastifyInstance } from 'fastify';
import type CreateUserController from '../../../modules/user/use-case/create-user/create-user-controller';
import type UpdateUserController from '../../../modules/user/use-case/update-user/update-user-controller';
import { makeUpdaeUserUseCaseFromDbConn } from '../../../modules/user/use-case/update-user';

export interface Business {
  user: {
    createUser: CreateUserController;
    updateUser: UpdateUserController;
  };
}

async function businessPlugin(
  fastify: FastifyInstance,
  options: unknown,
  next: (err?: Error) => void,
) {
  const business: Business = {
    user: {
      createUser: makeCreateUserUseCaseFromDbConn(fastify.knex),
      updateUser: makeUpdaeUserUseCaseFromDbConn(fastify.knex),
    },
  };

  fastify.decorate('business', business);

  next();
}

export default fp(businessPlugin, {
  fastify: '3.x',
  name: 'business-plugin',
  dependencies: ['knex-fastify-plugin'],
});
