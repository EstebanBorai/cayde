import ingredients from './ingredients';
import units from './unit';

import type { FastifyInstance } from 'fastify';

export default function (fastify: FastifyInstance): void {
  fastify.register(units, {
    prefix: '/units'
  });

  fastify.register(ingredients, {
    prefix: '/ingredients'
  });
}
