import { ingredients } from './services';

import type { FastifyInstance } from 'fastify';

const fastify: FastifyInstance = require('fastify')({
  logger: true
});

fastify.register(ingredients, {
  prefix: 'api/v1/ingredients'
});

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`Serve listening on ${address}`);
});
