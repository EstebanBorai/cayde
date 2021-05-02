import fp from 'fastify-plugin';
import mercurius from 'mercurius';

import makeGraphQLSchema from '../../graphql/schema';

import type { FastifyInstance, FastifyRequest } from 'fastify';

async function mercuriusPlugin(
  fastify: FastifyInstance,
  _: unknown,
  next: (err?: Error) => void,
) {
  const schema = makeGraphQLSchema();

  fastify.register(mercurius, {
    schema,
    path: '/graphql',
    graphiql: process.env.NODE_ENV === 'development',
    context: (_request: FastifyRequest) => {
      return {
        business: fastify.business,
      }
    }
  });

  next();
}

export default fp(mercuriusPlugin, {
  fastify: '3.x',
  name: 'mercurius-fastify-plugin',
  dependencies: ['knex-fastify-plugin'],
});
