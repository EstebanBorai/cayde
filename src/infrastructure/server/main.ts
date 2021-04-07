import fastify from 'fastify';
import cors from 'fastify-cors';
import { config as readEnvFile } from 'dotenv';

import knexfile from '../../config/database/knexfile';
import router from './router';
import businessPlugin from './plugins/business';
import knexPlugin from './plugins/knex';
import nextPlugin from './plugins/next';

import type { FastifyInstance } from 'fastify';

(async () => {
  const { NODE_ENV, PORT } = process.env;

  if (NODE_ENV === 'development') {
    readEnvFile();
  }

  const server: FastifyInstance = fastify({
    logger: true,
  });

  await server.register(knexPlugin, knexfile[NODE_ENV]);

  await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST'],
  });

  await server.register(nextPlugin);
  await server.register(businessPlugin);
  await server.register(router);

  server.listen(PORT || 3000, (err) => {
    if (err) throw err;
  });
})();
