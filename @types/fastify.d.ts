import type Knex from 'knex';

declare module 'fastify' {
  interface FastifyInstance {
    token?: Whizzes.TokenPayload;
    knex: Knex;
    whipeDatabase: () => void;
  }
}
