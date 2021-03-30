import v1 from './v1';

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
  fastify.register(v1, {
    prefix: 'v1',
  });

  done();
}
