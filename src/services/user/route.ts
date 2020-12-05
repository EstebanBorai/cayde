import { getManager } from 'typeorm';

import User from './entity';
import isFollowing from './utils/is-following';

import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyPluginOptions,
} from 'fastify';
import type { Server } from 'http';

function routes(
  fastify: FastifyInstance<
    Server,
    RawRequestDefaultExpression<Server>,
    RawReplyDefaultExpression<Server>
  >,
  _: FastifyPluginOptions,
  next: (err?: Error) => void,
) {
  fastify.get(
    '/:name',
    async (
      request: FastifyRequest<{
        Params: {
          name: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const name = request.params.name;
        const user = await fastify.repositories.users.findOneOrFail({
          relations: ['follows'],
          where: {
            name,
          },
        });

        return user;
      } catch (error) {
        return reply.status(500).send({
          message: `An error ocurred fetching the user with name: ${request.params.name}`,
          error,
        });
      }
    },
  );

  fastify.get(
    '/:name/posts',
    async (
      request: FastifyRequest<{ Params: { name: string } }>,
      reply: FastifyReply,
    ) => {
      try {
        const name = request.params.name;
        const user = await fastify.repositories.users.findOneOrFail({
          relations: ['posts'],
          where: { name },
        });

        return user.posts;
      } catch (error) {
        return reply.status(500).send({
          message: 'An error ocurred users',
          error,
        });
      }
    },
  );

  fastify.post(
    '/follow/:name',
    async (
      request: FastifyRequest<{ Params: { name: string } }>,
      reply: FastifyReply,
    ) => {
      try {
        if (fastify?.token?.user.name === request.params.name) {
          reply.status(400);

          return {
            message: `You can't follow yourself`,
          };
        }

        const [follower, followee] = await Promise.all([
          fastify.repositories.users.findOneOrFail({
            where: {
              name: fastify?.token?.user.name,
            },
          }),
          fastify.repositories.users.findOneOrFail({
            where: {
              name: request.params.name,
            },
          }),
        ]);

        if (await isFollowing(follower.id, followee.id)) {
          reply.status(400);

          return {
            message: `${follower.name} already follows ${followee.name}`,
          };
        }

        await getManager().transaction(async (transactionalManager) => {
          transactionalManager
            .createQueryBuilder()
            .relation(User, 'follows')
            .of(follower)
            .add(followee);

          followee.followerCount += 1;

          await transactionalManager.save(follower);
          await transactionalManager.save(followee);
        });

        return [follower, followee];
      } catch (error) {
        return reply.status(500).send({
          message: 'An error ocurred users',
          error,
        });
      }
    },
  );

  fastify.post(
    '/unfollow/:name',
    async (
      request: FastifyRequest<{ Params: { name: string } }>,
      reply: FastifyReply,
    ) => {
      try {
        if (fastify?.token?.user.name === request.params.name) {
          reply.status(400);

          return {
            message: `You can't unfollow yourself`,
          };
        }

        const [follower, followee] = await Promise.all([
          fastify.repositories.users.findOneOrFail({
            where: {
              name: fastify?.token?.user.name,
            },
          }),
          fastify.repositories.users.findOneOrFail({
            where: {
              name: request.params.name,
            },
          }),
        ]);

        if (!(await isFollowing(follower.id, followee.id))) {
          reply.status(400);

          return {
            message: `${follower.name} is not following ${followee.name}`,
          };
        }

        await getManager().transaction(async (transactionalManager) => {
          transactionalManager
            .createQueryBuilder()
            .relation(User, 'follows')
            .of(follower)
            .remove(followee);

          followee.followerCount -= 1;

          await transactionalManager.save(follower);
          await transactionalManager.save(followee);
        });

        return [follower, followee];
      } catch (error) {
        return reply.status(500).send({
          message: 'An error ocurred users',
          error,
        });
      }
    },
  );

  next();
}

export default function (
  fastify: FastifyInstance<
    Server,
    RawRequestDefaultExpression<Server>,
    RawReplyDefaultExpression<Server>
  >,
  _: FastifyPluginOptions,
  next: (err?: Error) => void,
): void {
  fastify.register(routes);

  next();
}
