import type { Repository } from 'typeorm';
import { Ingredient } from '../services/ingredients/routes/ingredients';
import { Unit } from '../services/ingredients/routes/unit';

declare module 'fastify' {
  interface FastifyInstance {
    repositories: {
      units: Repository<Unit>;
      ingredients: Repository<Ingredient>;
    }
  }
}
