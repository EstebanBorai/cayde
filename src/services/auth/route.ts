import { crypto, validate } from './utils';
import { getManager } from 'typeorm';

import type { FastifyInstance, FastifyRegisterOptions, FastifyReply, DoneFuncWithErrOrRes, FastifyRequest } from 'fastify';

function routes(fastify: FastifyInstance, _: FastifyRegisterOptions<unknown>, done: DoneFuncWithErrOrRes) {
  fastify.get('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      reply.status(400);

      return reply.send({
        message: 'missing "Authorization" header'
      });
    }

    const [kind, token] = authorizationHeader.split(' ');

    if (kind.toLowerCase() !== 'basic') {
      reply.status(400);

      return reply.send({
        message: 'invalid "Authorization" header'
      });
    }

    const buff = Buffer.from(token, 'base64');
    const decodedCredentials = buff.toString('ascii').split(':');

    if (!decodedCredentials.length) {
      reply.status(400);

      return reply.send({
        message: 'invalid "Authorization" header'
      });
    }

    const user = await fastify.repositories.users.findOneOrFail({
      where: {
        name: decodedCredentials[0],
      }
    });

    const { hash: passwordHash } = await fastify.repositories.secrets.findOneOrFail({
      where: {
        user: {
          id: user.id,
        }
      }
    });

    const isOk = await crypto.verify(decodedCredentials[1], passwordHash);

    if (isOk) {
      reply.status(200);

      return reply.send(user);
    }

    reply.status(403);

    return reply.send({
      message: 'invalid "username"/"password"'
    });
  });

  fastify.post('/signup', async (request: FastifyRequest, reply: FastifyReply) => {
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
          message: 'invalid email provided'
        });
      }
  
      if (!validate.isValidUserName(payload.name)) {
        reply.status(400);
  
        return reply.send({
          message: 'invalid username provided'
        });
      }
  
      const hash = await crypto.makeHash(payload.password);
  
      await getManager().transaction(async (transactionalManager) => {
        const newUser = fastify.repositories.users.create({
          firstName: payload.firstName,
          surname: payload.surname,
          name: payload.name,
          email: payload.email,
        });

        await transactionalManager.save(newUser);

        const newSecret = fastify.repositories.secrets.create({
          hash,
          user: newUser,
        });
    
        await transactionalManager.save(newSecret);

        return reply.status(201).send(newUser);
      });
    } catch (error) {
      reply.status(500);

      return reply.send({
        message: 'an error ocurred registering user',
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
