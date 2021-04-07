import type { Knex } from 'knex';
import type { Business } from '../infrastructure/server/plugins/business';

declare module 'fastify' {
  export interface FastifyInstance {
    business: Business;
    knex: Knex;
  }
}
