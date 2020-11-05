import services from '../../services';

import type { DoneFuncWithErrOrRes, FastifyInstance, FastifyRegisterOptions } from 'fastify';

export default function (fastify: FastifyInstance, _: FastifyRegisterOptions<unknown>, done: DoneFuncWithErrOrRes): void {
  fastify.register(services.userService.route, {
    prefix: '/v1/users'
  });

  fastify.register(services.postService.route, {
    prefix: '/v1/posts'
  });

  done();
}
