import fastify from 'fastify';

import { IngredientsService } from './services';
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
    username: 'cupboard_api',
    password: 'cupboard_api',
    database: 'cupboard_api',
    synchronize: true,
    logging: false
  },
  entities: {
    units: IngredientsService.models.Unit,
    ingredients: IngredientsService.models.Ingredient
  }
});

server.register(IngredientsService.router, {
  prefix: 'api/v1'
});

server.listen(3000, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  server.log.info(`Serve listening on ${address}`);
});
