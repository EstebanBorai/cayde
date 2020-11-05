import type { Repository } from 'typeorm';
import type { Whizzes } from './whizzes';

declare module 'fastify' {
  interface FastifyInstance {
    repositories: {
      posts: Repository<Whizzes.Post>;
      users: Repository<Whizzes.User>;
    }
  }
}
