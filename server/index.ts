import fastify, { FastifyInstance } from 'fastify';

import nextPlugin from '../server/plugins/next';
import routes from './routes';

export default async (): Promise<FastifyInstance> => {
  const server = fastify({ logger: true });

  await server.register(routes);
  await server.register(nextPlugin);

  return server;
};
