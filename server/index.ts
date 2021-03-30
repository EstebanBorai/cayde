import fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import cors from 'fastify-cors';
import { config as readEnvFile } from 'dotenv';

import knexfile from './config/knexfile';
import router from './router';
import knexPlugin from './plugins/knex';
import nextPlugin from './plugins/next';

import type { FastifyInstance } from 'fastify';

export async function makeServer(): Promise<FastifyInstance> {
  if (process.env.NODE_ENV === 'development') {
    readEnvFile();
  }

  const { NODE_ENV, JWT_SECRET } = process.env;

  const server: FastifyInstance = fastify({
    logger: true,
  });

  await server.register(knexPlugin, knexfile[NODE_ENV]);

  await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST'],
  });

  await server.register(fastifyJwt, {
    secret: NODE_ENV === 'test' ? 'secret' : JWT_SECRET,
  });

  await server.register(router);

  await server.register(nextPlugin);

  return server;
}
