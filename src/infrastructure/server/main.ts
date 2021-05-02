import fastify from 'fastify';
import cors from 'fastify-cors';
import { config as readEnvFile } from 'dotenv';

import knexfile from '../../config/database/knexfile';
import businessPlugin from './plugins/business';
import knexPlugin from './plugins/knex';
import nextPlugin from './plugins/next';
import mercuriusPlugin from './plugins/mercurius';
import brandLog from './utils/brand-log';

import type { FastifyInstance } from 'fastify';

(async () => {
  const { NODE_ENV, PORT } = process.env;
  const isDevelopmentEnvironment = NODE_ENV === 'development';

  if (isDevelopmentEnvironment) {
    readEnvFile();
  }

  const server: FastifyInstance = fastify({
    logger: {
      prettyPrint: true,
      level: 'debug',
    },
  });

  await server.register(knexPlugin, knexfile[NODE_ENV]);

  await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST'],
  });

  await server.register(nextPlugin);
  await server.register(businessPlugin);
  await server.register(mercuriusPlugin);

  server.listen(PORT, '0.0.0.0', (err) => {
    if (err) throw err;
    brandLog();
  });
})();
