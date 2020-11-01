import { makeErrorResponse } from '../../../utils/response-error';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export interface Unit {
  id: string;
  name: string;
  shortName: string;
}

export default async function (fastify: FastifyInstance) {

  fastify.get('/', async (_, reply: FastifyReply) => {
    try {
      const units = await fastify.repositories.units.find();

      reply.status(200);

      return units;
    } catch (e) {
      reply.status(500);

      fastify.log.error(e);

      return makeErrorResponse(500, `There was an error getting the units`);
    }
  });

  fastify.get('/:id', async (request: FastifyRequest<{
    Params: {
      id: string
    }
  }>, reply: FastifyReply) => {
    try {
      const unit = await fastify.repositories.units.findOne(request.params.id);

      if (unit) {
        return unit;
      }

      return makeErrorResponse(400, `Unit with ID: "${request.params.id}" doesn't exist`);

    } catch (e) {
      reply.status(500);

      fastify.log.error(e);

      return makeErrorResponse(500, 'There was an error getting Unit');
    }
  });

  fastify.post('/', async (request: FastifyRequest<{
    Body: Unit
  }>, reply: FastifyReply) => {
    const { name, shortName } = request.body;
    try {
      const newUnit = await fastify.repositories.units.create({
        name,
        shortName,
      });

      await fastify.repositories.units.save(newUnit);

      reply.status(201);

      return newUnit;
    } catch (e) {
      reply.status(500);

      fastify.log.error(e);

      return makeErrorResponse(500, 'There was an internal error');
    }
  });

  fastify.put('/:id', async (request: FastifyRequest<{
    Params: {
      id: string,
    },
    Body: Unit
  }>, reply: FastifyReply) => {
    try {
      const unit = await fastify.repositories.units.findOne(({
        where: { id: request.params.id }
      }));
      
      if (unit) {        
        await fastify.repositories.units.update(unit, request.body);

        reply.status(200);

        return unit;
      }
      
      reply.status(400);

      return makeErrorResponse(400, `There was an error updating the unit with id: ${request.params.id}`);
      
    } catch (e) {
      reply.status(500);

      fastify.log.error(e);

      return makeErrorResponse(500, `There was an internal error`);
    }

  });

  fastify.delete('/:id', async (request: FastifyRequest<{
    Params: {
      id: string
    }
  }>, reply: FastifyReply) => {
    try {
      const unitDeleted = await fastify.repositories.units.delete(request.params.id);

      reply.status(200);

      return unitDeleted;
    } catch (e) {
      reply.status(500);

      fastify.log.error(e);

      return makeErrorResponse(500, `There was an internal error`);
    }
  });

}
