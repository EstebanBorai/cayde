import 'reflect-metadata';
import { createConnection } from 'typeorm';
import fp from 'fastify-plugin';
import fs from 'fs';
import path from 'path';

import type { FastifyInstance } from 'fastify';
import type { ConnectionOptions, Repository, EntitySchema } from 'typeorm';

const WHIZZES_SERVER_TEST_DATABASE_PATH: string = path.join(
  process.cwd(),
  'test/tmp/whizzes-server-test.sqlite',
);

const deleteDbFile = (): void => {
  console.warn('===========================================');
  console.warn(`REMOVING FILE @: ${WHIZZES_SERVER_TEST_DATABASE_PATH}`);
  console.warn('===========================================');

  fs.rm(WHIZZES_SERVER_TEST_DATABASE_PATH, (error) => {
    if (error) {
      console.error(
        `An error ocurred deleting file on ${WHIZZES_SERVER_TEST_DATABASE_PATH}`,
      );
      console.error(error);
    }
  });
};

interface TypeORMPluginOptions {
  connectionOptions: ConnectionOptions;
  entities: Record<string, unknown>;
}

const makeConnectionOptions = (
  connectionOptions: ConnectionOptions,
): ConnectionOptions => {
  if (process.env.ENVIRONMENT === 'testing') {
    // if the current ENVIRONMENT is "testing" then we
    // use a SQLite In Memory Database
    console.warn('===========================================');
    console.warn('===| Using "SQLite In Memory Database" |===');
    console.warn('Will re create test database SQLite file on');
    console.warn(WHIZZES_SERVER_TEST_DATABASE_PATH);
    console.warn('===========================================');

    return {
      ...connectionOptions,
      type: 'sqlite',
      database: WHIZZES_SERVER_TEST_DATABASE_PATH,
      synchronize: true,
      logging: true,
    };
  }

  return connectionOptions;
};

async function typeorm(
  fastify: FastifyInstance,
  options: TypeORMPluginOptions,
  done,
) {
  try {
    const hasEntities = options.entities && Object.values(options.entities);
    const connectionOptions: ConnectionOptions = makeConnectionOptions({
      ...options.connectionOptions,
      entities: ((hasEntities
        ? Object.values(options.entities)
        : []) as unknown) as EntitySchema<unknown>[],
    });

    const dbConnection = await createConnection(connectionOptions);
    const mappedRepositores: Record<string, Repository<unknown>> = {};

    if (hasEntities) {
      // if entities are provided, then map every entity from the `options.entities` object
      // to its `EntitySchema` and assign it to the `mappedRepositories` to decorate
      // fastify's instance with the repositories
      Object.keys(options.entities).forEach((entityName) => {
        mappedRepositores[entityName] = dbConnection.getRepository(
          options.entities[entityName] as EntitySchema<unknown>,
        );
      });
    }

    const whipeDatabase = async () => {
      console.warn('===========================================');
      console.warn('===========| Whipping Database |===========');
      console.warn('===========================================');

      deleteDbFile();
    };

    fastify.decorate('repositories', mappedRepositores);
    fastify.decorate('whipeDatabase', whipeDatabase);
  } catch (error) {
    fastify.log.error('Unable to connect to the database');
    fastify.log.error(error);
  } finally {
    done();
  }
}

export default fp(typeorm, {
  fastify: '3.x',
  name: 'typeorm-fastify-plugin',
});
