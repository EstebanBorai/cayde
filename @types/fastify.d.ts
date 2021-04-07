import type { Knex } from 'knex';
import type {
  FastifyReply,
  FastifyRequest,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyPluginOptions,
} from 'fastify';
import type { Server } from 'http';

declare module 'fastify' {
  interface FastifyInstance {
    knex: Knex;
  }
}
