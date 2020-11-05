import api from './api';

import type { FastifyInstance, FastifyRegisterOptions, DoneFuncWithErrOrRes } from 'fastify';

export default function (fastify: FastifyInstance, _: FastifyRegisterOptions<unknown>, done: DoneFuncWithErrOrRes): void {
  fastify.register(api, {
    prefix: '/api'
  });

  done();
}
