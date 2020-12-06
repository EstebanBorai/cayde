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
  fastify.post(
    '/',
    async (
      request: FastifyRequest<{ Body: { content: string } }>,
      reply: FastifyReply,
    ) => {
      try {
        const user: Whizzes.Users.User = await fastify
          .knex('users')
          .where({
            name: fastify?.token?.user.name,
          })
          .first();

        fastify.knex.transaction(
          async (trx: Transaction): Promise<void> => {
            const post = await trx('posts')
              .insert<Whizzes.Posts.Post>({
                content: request.body.content,
                user_id: user.id,
              })
              .returning('*');

            trx.commit();

            return reply.status(201).send(post);
          },
        );
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
