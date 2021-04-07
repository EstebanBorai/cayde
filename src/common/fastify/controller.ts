import type { FastifyReply, FastifyRequest } from 'fastify';
import type { RouteGenericInterface } from 'fastify/types/route';
import type { IncomingMessage, Server, ServerResponse } from 'http';

type Reply = FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>;

export default abstract class FastifyController {
  private implIdentifier: string;

  constructor(implIdentifier: string) {
    this.implIdentifier = implIdentifier;
  }

  private static messageReply(reply: FastifyReply, statusCode: number, message: string): Reply {
    return reply.status(statusCode).send({ message });
  }

  protected abstract impl(request: FastifyRequest, reply: FastifyReply): Promise<unknown>;

  public async execute(request: FastifyRequest, reply: FastifyReply): Promise<unknown> {
    try {
      return this.impl(request, reply);
    } catch (error) {
      console.error('[' + this.implIdentifier + ']', error);

      return this.internalServerError(reply, error);
    }
  }

  public internalServerError(reply: FastifyReply, error: string): Reply {
    return FastifyController.messageReply(reply, 500, error || 'Internal Server Error');
  }

  public notFound(reply: FastifyReply, message?: string): Reply {
    return FastifyController.messageReply(reply, 404, message || 'Not Found');
  }

  public badRequest(reply: FastifyReply, message?: string): Reply {
    return FastifyController.messageReply(reply, 400, message || 'Bad Request');
  }
}
