import FastifyController from '../../../../common/fastify/controller';
import UpdateUserUseCase from './update-user-use-case';
import UpdateUserDTO from './update-user-dto';
import UserMapper from '../../infrastructure/mapper';
import UserNotFoundError from '../../domain/error/user-not-found';

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RouteGenericInterface } from 'fastify/types/route';
import type { Server, IncomingMessage, ServerResponse } from 'http';
import DomainException from '../../../../common/ddd/domain-exception';

export default class CreateUserController extends FastifyController {
  private useCase: UpdateUserUseCase;

  constructor(useCase: UpdateUserUseCase) {
    super('update-user-use-case');

    this.useCase = useCase;
  }

  protected async impl(
    request: FastifyRequest<
      {
        Params: {
          id: string;
        };
        Body: UpdateUserDTO;
      },
      Server,
      IncomingMessage
    >,
    reply: FastifyReply<
      Server,
      IncomingMessage,
      ServerResponse,
      RouteGenericInterface,
      unknown
    >,
  ): Promise<unknown> {
    try {
      const dto: UpdateUserDTO = {
        id: request.params.id,
        ...request.body,
      };
      const user = await this.useCase.execute(dto);
      const responseBody = UserMapper.intoPresentation(user);

      reply.status(200);

      return reply.send(responseBody);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return this.notFound(reply, error.message);
      }

      if (error instanceof DomainException) {
        return this.badRequest(reply, error.message);
      }

      return this.internalServerError(reply, error.toString());
    }
  }
}
