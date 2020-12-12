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
        const name = token.user.name;

        const query = `
          SELECT
            posts.id,
            posts.content,
            posts.user_id AS author_id,
            posts.created_at,
            users."name" AS author,
            CONCAT(users.first_name, CONCAT(' ', users.surname)) AS author_full_name
          FROM
            posts
          INNER JOIN users ON posts.user_id::text = users.id::text
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
          ORDER BY
            posts.created_at DESC;`;

        const result = await fastify.knex.raw(query, [name]);

        return result.rows.map(
          (row: {
            id: string;
            content: string;
            author_id: string;
            created_at: Date;
            author: string;
            author_full_name: string;
          }) => ({
            id: row.id,
            content: row.content,
            userId: row.author_id,
            createdAt: row.created_at,
            author: row.author,
            authorFullName: row.author_full_name,
          }),
        );
      } catch (error) {
        return reply.status(500).send({
          message: 'An error ocurred fetching the feed',
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
