import fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import cors from 'fastify-cors';
import { config as readEnvFile } from 'dotenv';

import knexfile from './config/knexfile';
import router from './router';
import knexPlugin from './plugins/knex';

import type { FastifyInstance } from 'fastify';

export function makeServer(): FastifyInstance {
  if (process.env.NODE_ENV === 'development') {
    readEnvFile();
  }

  const { NODE_ENV, JWT_SECRET } = process.env;

  const server: FastifyInstance = fastify({
    logger: true,
  });

  server.register(knexPlugin, knexfile[NODE_ENV]);

  server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST'],
  });

  server.register(fastifyJwt, {
    secret: NODE_ENV === 'testing' ? 'secret' : JWT_SECRET,
  });

  server.register(router);

  return server;
}
