import ingredients from './ingredients';
import units from './unit';

import type { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.register(units, {
    prefix: '/units'
  });

  fastify.register(ingredients, {
    prefix: '/ingredients'
  });
}
