import type { FastifyInstance, FastifyRegisterOptions, FastifyReply, DoneFuncWithErrOrRes, FastifyRequest } from 'fastify';

function routes(fastify: FastifyInstance, _: FastifyRegisterOptions<unknown>, done: DoneFuncWithErrOrRes) {
  fastify.get('/', async (_: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send('Whizzes Post Route');
  });

  done();
}

export default function (fastify: FastifyInstance, _: FastifyRegisterOptions<unknown>, done: DoneFuncWithErrOrRes): void {
  fastify.register(routes);

  done();
}
