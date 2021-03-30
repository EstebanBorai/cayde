import api from './api';

import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
} from 'fastify';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void,
): void {
  fastify.register(api, {
    prefix: 'api',
  });

  done();
}
