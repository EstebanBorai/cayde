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
  fastify.get('/hello', (request: FastifyRequest, reply: FastifyReply) => {
    reply.send('Hello');
  });

  next();
}
