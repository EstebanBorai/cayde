import { v4 as uuid } from 'uuid';

import { makeErrorResponse } from '../../utils/response-error';

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export interface Unit {
  id: string;
  name: string;
  shortName: string;
}

interface UnitDatabase {
  [id: string]: Unit;
}

export default async function (fastify: FastifyInstance) {
  const unitdb: UnitDatabase = {
    '1': {
      id: '1',
      name: 'kilograms',
      shortName: 'kg',
    },
  };

  fastify.get('/units', async () => Object.values(unitdb));

  fastify.get('/units/:id', async (request: FastifyRequest<{
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

  fastify.post('/units', async (request: FastifyRequest<{
    Body: Unit
  }>, reply: FastifyReply) => {
    const id = uuid();
    const unit = {
      ...request.body,
      id
    };

    unitdb[id] = unit;

    reply.status(201);

    return unit;
  });

  fastify.put('/units/:id', async (request: FastifyRequest<{
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

  fastify.delete('/units/:id', async (request: FastifyRequest<{
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