import { getManager } from 'typeorm';

import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyPluginOptions
} from 'fastify';
import type { Server } from 'http';

function routes(
  fastify: FastifyInstance<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>>,
  _: FastifyPluginOptions,
  next: (err?: Error) => void
) {
  fastify.post(
    '/',
    async (
      request: FastifyRequest<{ Body: { content: string } }>,
      reply: FastifyReply,
    ) => {
      try {
        const user = await fastify.repositories.users.findOneOrFail({
          relations: ['posts'],
          where: {
            // we use the user from the token in order
            // to authenticate the post owner
            name: fastify.token.user.name,
          },
        });

        await getManager().transaction(async (transactionalManager) => {
          const newPost = fastify.repositories.posts.create({
            content: request.body.content,
            author: user,
          });

          await transactionalManager.save(newPost);

          user.posts.push(newPost);

          await transactionalManager.save(user);

          return reply.status(201).send(newPost);
        });
      } catch (error) {
        return reply.status(500).send({
          message: 'An error ocurred creating the post',
          error,
        });
      }
    },
  );

  next();
}

export default function (
  fastify: FastifyInstance<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>>,
  _: FastifyPluginOptions,
  next: (err?: Error) => void
): void {
  fastify.register(routes);

  next();
}
