import { v4 as uuid } from 'uuid';

import { makeErrorResponse } from '../../utils/response-error';

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

interface Unit {
  id: string;
  name: string;
  shortName: string;
}

interface Ingredient {
  id: string;
  name: string;
  unit: Unit;
  quantity: number;
  price: number;
}

interface IngredientsDatabase {
  [id: string]: Ingredient;
}

export default async function (fastify: FastifyInstance) {
  const db: IngredientsDatabase = {
    'abc': {
      id: 'abc',
      name: 'Butter',
      unit: {
        id: 'def',
        name: 'kilograms',
        shortName: 'kg'
      },
      quantity: 200,
      price: 3.50
    }
  };

  fastify.get('/', async () => Object.values(db));

  fastify.get('/:id', async (request: FastifyRequest<{
    Params: {
      id: string
    }
  }>, reply: FastifyReply) => {
    const ingredientId = request.params.id;
    const ingredient = db[ingredientId];

    if (ingredient) {
      return ingredient;
    }

    reply.status(404);

    return makeErrorResponse(404, `Ingredient with ID: "${ingredientId}" doesn't exist`);
  });

  fastify.post('/', async (request: FastifyRequest<{
    Body: Ingredient
  }>, reply: FastifyReply) => {
    const id = uuid();
    const ingredient = {
      ...request.body,
      id
    };

    db[id] = ingredient;

    reply.status(201);

    return ingredient;
  });

  fastify.put('/:id', async (request: FastifyRequest<{
    Params: {
      id: string,
    }
    Body: Ingredient
  }>, reply: FastifyReply) => {
    const ingredientId = request.params.id;
    const ingredient = db[ingredientId];

    if (ingredient) {
      const updatedIngredient = {
        ...request.body
      };

      db[ingredientId] = updatedIngredient

      reply.status(200)
      return updatedIngredient
    }

    return makeErrorResponse(404, `There was an error updating the ingredient with id: ${ingredientId}`)
  });

  fastify.delete('/:id', async (request: FastifyRequest<{
    Params: {
      id: string
    }
  }>, reply: FastifyReply) => {
    const ingredientId = request.params.id;
    const ingredient = db[ingredientId];

    if (ingredient) {
      delete db[ingredientId];
      return ingredient;
    }

    reply.status(400);
    return makeErrorResponse(400, `Ingredient with id: ${ingredientId} doesn't exists`);
  })
}
