import { makeCreateUserUseCaseFromDbConn } from '../../use-case/create-user';

import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyPluginOptions,
} from 'fastify';
import type { Server } from 'http';

export default function (
  fastify: FastifyInstance<
    Server,
    RawRequestDefaultExpression<Server>,
    RawReplyDefaultExpression<Server>
  >,
  _: FastifyPluginOptions,
  next: (err?: Error) => void,
): void {
  fastify.post('/', (request: FastifyRequest, reply: FastifyReply) => {
    fastify.business.user.createUser.execute(request, reply);
  });

  next();
}
