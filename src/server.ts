import { ingredients } from './services';

import type { FastifyInstance } from 'fastify';

const fastify: FastifyInstance = require('fastify')({
  logger: true
});

fastify.register(require('fastify-postgres'), {
  // to keep it simple we just hardcoded credentials + connection details
  connectionString: 'postgresql://cupboard-api:cupboard-api@localhost:5432/cupboard-api'
})

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
