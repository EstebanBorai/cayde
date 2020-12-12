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
    '/',
    async (
      request: FastifyRequest<{
        Params: {
          fromDate: string;
          toDate: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const token = fastify?.token as Whizzes.TokenPayload;
        const user = token.user;

        const query = `
          SELECT
            posts.id,
            posts.content,
            posts.user_id,
            posts.created_at
          FROM
            posts
          WHERE
            user_id IN(
              SELECT
                followee::text FROM user_follows
              WHERE
                user_follows.follower::text = (
                  SELECT
                    id::text FROM users
                  WHERE
                    users.name = ?))
            AND 
          ORDER BY
            posts.created_at DESC;`;

        const result = await fastify.knex.raw(query, [user.name]);

        return result.rows.map(
          (row: {
            id: string;
            content: string;
            user_id: string;
            created_at: Date;
          }) => ({
            id: row.id,
            content: row.content,
            userId: row.user_id,
            createdAt: row.created_at,
          }),
        );
      } catch (error) {
        return reply.status(500).send({
          message: `An error ocurred fetching the user with name: ${request.params.name}`,
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
