import { IngredientsService } from './services';
import typeormPlugin from './plugins/typeorm';

import type { FastifyInstance } from 'fastify';

const fastify: FastifyInstance = require('fastify')({
  logger: true
});

fastify.register(typeormPlugin, {
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
    units: IngredientsService.models.Unit
  }
});

fastify.register(IngredientsService.router, {
  prefix: 'api/v1'
});

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`Serve listening on ${address}`);
});
