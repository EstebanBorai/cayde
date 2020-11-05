import type { FastifyInstance, FastifyReply, FastifyRequest, DoneFuncWithErrOrRes, FastifyRegisterOptions } from 'fastify';

function routes(fastify: FastifyInstance, _: FastifyRegisterOptions<unknown>, done: DoneFuncWithErrOrRes) {
  fastify.get('/', async (_: FastifyRequest, reply: FastifyReply) => {
    try {
      return fastify.repositories.users.find();
    } catch (error) {
      return reply.status(500).send({
        message: 'An error ocurred users',
        error
      });
    }
  });

  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // we should validate this user in the future
      // and if invalid return 400 (Bad Request) instead
      const user = request.body;
      const created = await fastify.repositories.users.create(user);

      await fastify.repositories.users.save(created);

      return reply.status(201).send(created);
    } catch (error) {
      return reply.status(500).send({
        message: 'An error ocurred creating user',
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
