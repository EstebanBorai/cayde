import fastify from 'fastify';

import router from './router';
import services from './services';
import typeormPlugin from './plugins/typeorm';

import type { FastifyInstance } from 'fastify';

const server: FastifyInstance = fastify({
  logger: true
});

server.register(typeormPlugin, {
  connectionOptions: {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'whizzes',
    password: 'whizzes',
    database: 'whizzes',
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

server.listen(3000, function (err) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
