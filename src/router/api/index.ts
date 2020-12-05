import services from '../../services';

import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
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
  fastify.addHook(
    'preValidation',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const tokenPayload: Whizzes.TokenPayload = await request.jwtVerify();

        fastify.token = tokenPayload;
      } catch (err) {
        reply.send(err);
      }
    },
  );

  fastify.register(services.userService.route, {
    prefix: '/v1/users',
  });

  fastify.register(services.postService.route, {
    prefix: '/v1/posts',
  });

  next();
}
