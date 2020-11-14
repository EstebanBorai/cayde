import type { Repository } from 'typeorm';

declare module 'fastify' {
  interface FastifyInstance {
    token?: Whizzes.TokenPayload;
    repositories: {
      posts: Repository<Whizzes.Posts.Post>;
      users: Repository<Whizzes.Users.User>;
      secrets: Repository<Whizzes.Auth.Secret>;
    }
    whipeDatabase: () => void;
  }
}
