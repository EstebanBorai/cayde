import FastifyController from '../../../../common/fastify/controller';
import CreateUserUseCase from './create-user-use-case';
import CreateUserDTO from './create-user-dto';
import UserMapper from '../../infrastructure/mapper';
import EmailTakenError from '../../domain/error/email-taken-error';

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RouteGenericInterface } from 'fastify/types/route';
import type { Server, IncomingMessage, ServerResponse } from 'http';

export default class CreateUserController extends FastifyController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super('create-user-use-case');

    this.useCase = useCase;
  }

  protected async impl(request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>, reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>): Promise<unknown> {
    try {
      const dto = request.body as CreateUserDTO;
      const user = await this.useCase.execute(dto);
      const responseBody = UserMapper.intoPresentation(user);

      reply.status(201);

      return reply.send(responseBody);
    } catch (error) {
      if (error instanceof EmailTakenError) {
        reply.status(400);

        return this.badRequest(reply, error.message);
      }

      return this.internalServerError(reply, error.toString());
    }
  }
}
