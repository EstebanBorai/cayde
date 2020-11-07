import fastify from 'fastify';
import { config as readEnvFile } from 'dotenv';

import router from './router';
import services from './services';
import typeormPlugin from './plugins/typeorm';

import type { FastifyInstance } from 'fastify';

if (process.env.ENVIRONMENT === 'development') {
  readEnvFile();
}

const { PORT, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } = process.env;

const server: FastifyInstance = fastify({
  logger: true
});

server.register(typeormPlugin, {
  connectionOptions: {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    synchronize: true,
    logging: true
  },
  entities: {
    posts: services.postService.model,
    users: services.userService.model,
    secrets: services.authService.model,
  }
});

server.register(router);

server.listen(parseInt(PORT, 10), function (err) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
