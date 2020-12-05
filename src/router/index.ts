import api from './api';
import { route as auth } from '../services/auth';

import type {
  FastifyInstance,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyPluginOptions
} from 'fastify';
import type { Server } from 'http';

export default function (
  fastify: FastifyInstance<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>>,
  _: FastifyPluginOptions,
  next: (err?: Error) => void
): void {
  fastify.register(api, {
    prefix: '/api',
  });

  fastify.register(auth, {
    prefix: '/auth',
  });

  next();
}
