import { makeErrorResponse } from '../../../utils/response-error';

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import type { Unit } from './unit';

export interface Ingredient {
  id: string;
  name: string;
  unit: Unit;
  quantity: number;
  price: number;
}

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async (_, reply: FastifyReply) => {
    try {
      const ingredients = await fastify.repositories.ingredients.find({ relations: ["unit"] });

      reply.status(200);

      return ingredients;
    } catch (e) {
      reply.status(500);

      fastify.log.error(e);

      return makeErrorResponse(500, 'There was an error getting the ingredients');
    }
  });

  fastify.get('/:id', async (request: FastifyRequest<{
    Params: {
      id: string
    }
  }>, reply: FastifyReply) => {
    try {
      const ingredient = await fastify.repositories.ingredients.findOne(
        request.params.id
      );

      if (ingredient) {
        return ingredient;
      }

      reply.status(400);

      return makeErrorResponse(400, `Ingredient with ID: "${request.params.id}" doesn't exist`);
    } catch (e) {
      reply.status(500);

      fastify.log.error(e);

      return makeErrorResponse(500, `There was an internal error`);
    }
  });

  fastify.post('/', async (request: FastifyRequest<{
    Body: Ingredient
  }>, reply: FastifyReply) => {
    const { name, unit, quantity, price } = request.body;
    try {
      const newIngredient = await fastify.repositories.ingredients.create({
        name,
        unit,
        quantity,
        price,
      });

      await fastify.repositories.ingredients.save(newIngredient);

      reply.status(201);

      return newIngredient;
    } catch (e) {
      reply.status(500);

      fastify.log.error(e);

      return makeErrorResponse(500, 'There was an error creating a new ingredient');
    }
  });

  fastify.put('/:id', async (request: FastifyRequest<{
    Params: {
      id: string
    }, 
    Body: Ingredient 
  }>, reply: FastifyReply) => {
    try {
      const ingredient = await fastify.repositories.ingredients.findOne({
        where: { id: request.params.id },
      });

      if (ingredient) {
        await fastify.repositories.ingredients.update(ingredient, request.body);

        reply.status(200);

        return ingredient;
      }

      reply.status(400);

      return makeErrorResponse(400, `There was an error updating the ingredient with id: ${request.params.id}`);
      
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
      const ingredientDeleted = await fastify.repositories.ingredients.delete(request.params.id);

      reply.status(200);

      return ingredientDeleted;
    } catch (e) {
      reply.status(500);

      fastify.log.error(e);

      return makeErrorResponse(500, `There was an internal error`);
    }
  });
}
