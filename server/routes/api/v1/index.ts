import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void,
): void {
  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({
      message: 'This is an API Route!',
      hint: 'Every request to api/v1 will be handled by Fastify without using the NextJS plugin',
    });
  });

  done();
}
