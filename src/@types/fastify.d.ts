import type { Repository } from 'typeorm';
import { Unit } from '../services/ingredients/routes/unit';

declare module 'fastify' {
  interface FastifyInstance {
    repositories: {
      units: Repository<Unit>;
    }
  }
}
