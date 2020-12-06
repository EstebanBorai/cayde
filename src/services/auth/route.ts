import { crypto, validate, basicAuth } from './utils';

import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyPluginOptions,
} from 'fastify';
import type { Server } from 'http';
import { Transaction } from 'knex';

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
    '/login',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        reply.status(400);

        return reply.send({
          message: 'missing "Authorization" header',
        });
      }

      const credentials = basicAuth(authorizationHeader);

      const user = await fastify
        .knex('users')
        .where({
          name: credentials.userId,
        })
        .first();

      const { hash: passwordHash }: Whizzes.Auth.Secret = await fastify
        .knex('secrets')
        .where({
          user_id: user.id,
        })
        .first();

      const isOk = await crypto.verify(credentials.password, passwordHash);

      if (isOk) {
        const payload: Whizzes.TokenPayload = {
          user: {
            name: user.name,
          },
        };

        const token = fastify.jwt.sign(payload);

        reply.status(200);

        return reply.send({ token });
      }

      reply.status(403);

      return reply.send({
        message: 'invalid "username"/"password"',
      });
    },
  );

  fastify.post(
    '/signup',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const payload = request.body as Whizzes.Auth.SignUpPayload;

        // commented for simplicity while testing user creation
        // if (!validate.isValidPassword(payload.password)) {
        //   reply.status(400);

        //   return reply.send({
        //     message: 'invalid password'
        //   });
        // }

        if (!validate.isValidEmail(payload.email)) {
          reply.status(400);

          return reply.send({
            message: 'invalid email provided',
          });
        }

        if (!validate.isValidUserName(payload.name)) {
          reply.status(400);

          return reply.send({
            message: 'invalid username provided',
          });
        }

        const hash = await crypto.makeHash(payload.password);

        fastify.knex.transaction(
          async (trx: Transaction): Promise<void> => {
            const user = await trx
              .insert<Whizzes.Users.User>({
                firstName: payload.firstName,
                surname: payload.surname,
                name: payload.name.toLowerCase(),
                email: payload.email.toLowerCase(),
              })
              .returning('*')
              .first();

            await trx
              .insert<Whizzes.Auth.Secret>({
                hash,
                userId: user.id,
              })
              .returning('*')
              .first();

            trx.commit();

            return reply.status(201).send(user);
          },
        );
      } catch (error) {
        reply.status(500);

        return reply.send({
          message: 'an error ocurred registering user',
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
