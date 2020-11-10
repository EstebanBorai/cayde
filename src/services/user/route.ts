import type { FastifyInstance, FastifyReply, FastifyRequest, DoneFuncWithErrOrRes, FastifyRegisterOptions } from 'fastify';

function routes(fastify: FastifyInstance, _: FastifyRegisterOptions<unknown>, done: DoneFuncWithErrOrRes) {
  fastify.get('/:name', async (request: FastifyRequest<{
    Params: {
      name: string
    }
  }>, reply: FastifyReply) => {
    try {
      const name = request.params.name;
      const user = await fastify.repositories.users.findOneOrFail({
        where: {
          name
        }
      });

      return user;
    } catch (error) {
      return reply.status(500).send({
        message: `An error ocurred fetching the user with name: ${request.params.name}`,
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
