import { getManager } from 'typeorm';

import type { FastifyInstance, FastifyRegisterOptions, FastifyReply, DoneFuncWithErrOrRes, FastifyRequest } from 'fastify';

function routes(fastify: FastifyInstance, _: FastifyRegisterOptions<unknown>, done: DoneFuncWithErrOrRes) {
  fastify.post('/', async (request: FastifyRequest<{ Body: { content: string; } }>, reply: FastifyReply) => {
    try {
      const user = await fastify.repositories.users.findOneOrFail({
        relations: ['posts'],
        where: {
          // we use the user from the token in order
          // to authenticate the post owner
          name: fastify.token.user.name
        }
      });

      await getManager().transaction(async (transactionalManager) => {
        const newPost = fastify.repositories.posts.create({
          content: request.body.content,
          author: user
        });

        await transactionalManager.save(newPost);

        user.posts.push(newPost);

        await transactionalManager.save(user);

        return reply.status(201).send(newPost);
      });
    } catch (error) {
      return reply.status(500).send({
        message: 'An error ocurred creating the post',
        error
      });
    }
  });

  done();
}

export default function (fastify: FastifyInstance, _: FastifyRegisterOptions<unknown>, done: DoneFuncWithErrOrRes): void {
  fastify.register(routes);

  done();
}
