import 'reflect-metadata';
import { createConnection } from 'typeorm';
import fp from 'fastify-plugin';

import type { FastifyInstance } from 'fastify';
import type { ConnectionOptions, Repository, EntitySchema } from 'typeorm';

interface TypeORMPluginOptions {
  connectionOptions: ConnectionOptions;
  entities: Record<string, unknown>;
}

async function typeorm(
  fastify: FastifyInstance,
  options: TypeORMPluginOptions
) {
  try {
    const hasEntities = options.entities && Object.values(options.entities);
    const connectionOptions: ConnectionOptions = {
      ...options.connectionOptions,
      entities: (hasEntities ? Object.values(options.entities) : [])  as unknown as EntitySchema<unknown>[]
    }

    const dbConnection = await createConnection(connectionOptions);
    const mappedRepositores: Record<string, Repository<unknown>> = {};

    if (hasEntities) {
      // if entities are provided, then map every entity from the `options.entities` object
      // to its `EntitySchema` and assign it to the `mappedRepositories` to decorate
      // fastify's instance with the repositories
      Object.keys(options.entities).forEach((entityName) => {
        mappedRepositores[entityName] = dbConnection.getRepository(options.entities[entityName] as EntitySchema<unknown>);
      });
    }

    fastify.decorate('repositories', mappedRepositores);
  } catch (error) {
    fastify.log.error('Unable to connect to the database', error);
  }
}

export default fp(typeorm);
