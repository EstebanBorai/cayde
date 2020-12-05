import api from './api';
import { route as auth } from '../services/auth';

import type {
  FastifyInstance,
  FastifyRegisterOptions,
  DoneFuncWithErrOrRes,
} from 'fastify';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: DoneFuncWithErrOrRes,
): void {
  fastify.register(api, {
    prefix: '/api',
  });

  fastify.register(auth, {
    prefix: '/auth',
  });

  done();
}
