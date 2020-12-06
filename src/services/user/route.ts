import isFollowing from './utils/is-following';
import findFollowerAndFollowee from './utils/find-follower-followee';

import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyPluginOptions,
} from 'fastify';
import type { Server } from 'http';
import type { Transaction } from 'knex';

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
        const user = await fastify
          .knex('users')
          .where({
            name,
          })
          .first();

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
        const user: Whizzes.Users.User = await fastify
          .knex('users')
          .where({
            name,
          })
          .first();

        const posts: Whizzes.Posts.Post[] = await fastify.knex('posts').where({
          user_id: user.id,
        });

        return posts;
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

        const { follower, followee } = await findFollowerAndFollowee(
          fastify.knex,
          fastify?.token?.user.name as string,
          request.params.name,
        );

        if (await isFollowing(fastify.knex, follower.id, followee.id)) {
          reply.status(400);

          return {
            message: `${follower.name} already follows ${followee.name}`,
          };
        }

        await fastify.knex.transaction(
          async (trx: Transaction): Promise<void> => {
            await trx('user_follows').insert({
              follower: follower.id,
              followee: followee.id,
            });

            await trx('users')
              .update<Whizzes.Users.User>({
                followerCount: followee.followerCount + 1,
              })
              .where({
                id: followee.id,
              });
          },
        );
        
        const result = await findFollowerAndFollowee(
          fastify.knex,
          fastify?.token?.user.name as string,
          request.params.name,
        );

        return reply.status(200).send(result);
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

        const { follower, followee } = await findFollowerAndFollowee(
          fastify.knex,
          fastify?.token?.user.name as string,
          request.params.name,
        );

        if (!(await isFollowing(fastify.knex, follower.id, followee.id))) {
          reply.status(400);

          return {
            message: `${follower.name} is not following ${followee.name}`,
          };
        }

        await fastify.knex.transaction(
          async (trx: Transaction): Promise<void> => {
            await trx('user_follows').del().where({
              follower: follower.id,
              followee: followee.id,
            });

            await trx('users')
              .update<Whizzes.Users.User>({
                followerCount: followee.followerCount - 1,
              })
              .where({
                id: followee.id,
              })
              .returning('*');
          },
        );

        const result = await findFollowerAndFollowee(
          fastify.knex,
          fastify?.token?.user.name as string,
          request.params.name,
        );

        return reply.status(200).send(result);
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
