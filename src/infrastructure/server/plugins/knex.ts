import fp from 'fastify-plugin';
import knex from 'knex';
import knexStringcase from 'knex-stringcase';

import type { FastifyInstance } from 'fastify';

async function typeorm(
  fastify: FastifyInstance,
  options: unknown,
  next: (err?: Error) => void,
) {
  const stringcaseConfig = knexStringcase(options);

  if (!fastify.knex) {
    const knexConnection = knex(stringcaseConfig);

    fastify.decorate('knex', knexConnection);
  }

  next();
}

export default fp(typeorm, {
  fastify: '3.x',
  name: 'knex-fastify-plugin',
});
