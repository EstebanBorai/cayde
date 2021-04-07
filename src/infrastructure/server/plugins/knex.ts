import fp from 'fastify-plugin';
import Knex from 'knex';
import knexStringcase from 'knex-stringcase';

import type { FastifyInstance } from 'fastify';

async function knex(
  fastify: FastifyInstance,
  options: unknown,
  next: (err?: Error) => void,
) {
  const stringcaseConfig = knexStringcase(options);

  if (!fastify.knex) {
    const knexConnection = Knex(stringcaseConfig);

    fastify.decorate('knex', knexConnection);
  }

  next();
}

export default fp(knex, {
  fastify: '3.x',
  name: 'knex-fastify-plugin',
});
