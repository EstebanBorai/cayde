import services from '../../services';

import type {
  DoneFuncWithErrOrRes,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: DoneFuncWithErrOrRes,
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

  done();
}
