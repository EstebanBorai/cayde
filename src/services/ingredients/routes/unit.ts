import { makeErrorResponse } from '../../../utils/response-error';

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export interface Unit {
  id: string;
  name: string;
  shortName: string;
}

interface UnitDatabase {
  [id: string]: Unit;
}

export default function (fastify: FastifyInstance): void {
  const unitdb: UnitDatabase = {
    '1': {
      id: '1',
      name: 'kilograms',
      shortName: 'kg',
    },
  };

  fastify.get('/', async () => Object.values(unitdb));

  fastify.get('/:id', async (request: FastifyRequest<{
    Params: {
      id: string
    }
  }>, reply: FastifyReply) => {
    const unitId = request.params.id;
    const unit = unitdb[unitId];

    if (unit) {
      return unit;
    }

    reply.status(400)

    return makeErrorResponse(400, `Unit with ID: "${unitId}" doesn't exist`);
  });

  fastify.post('/', async (request: FastifyRequest<{
    Body: Unit
  }>, reply: FastifyReply) => {
    // create a new entity
    const newUnit = await fastify.repositories.units.create({
      name: request.body.name,
      shortName: request.body.shortName,
    });

    // store it into the database
    await fastify.repositories.units.save(newUnit);

    reply.status(201);

    // return a copy to the client
    // PD: deelete comments after read!
    return newUnit;
  });

  fastify.put('/:id', async (request: FastifyRequest<{
    Params: {
      id: string,
    },
    Body: Unit
  }>, reply: FastifyReply) => {
    const unitId = request.params.id;
    const unit = unitdb[unitId];

    if (unit) {
      const updatedUnit = {
        ...request.body,
        id: unitId
      };

      unitdb[unitId] = updatedUnit;
      reply.status(200);

      return updatedUnit;
    }

    return makeErrorResponse(400, `There was an error updating the unit with id: ${unitId}`);
  });

  fastify.delete('/:id', async (request: FastifyRequest<{
    Params: {
      id: string
    }
  }>, reply: FastifyReply) => {
    const unitId = request.params.id;
    const unit = unitdb[unitId];

    if (unit) {
      delete unitdb[unitId];
      return unit;
    }

    reply.status(400);

    return makeErrorResponse(400, `Unit with id: ${unitId} doesn't exists`);
  });

} 