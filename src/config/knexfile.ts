import type { Config } from 'knex';

const {
  PGHOST = '127.0.0.1',
  POSTGRES_DB = 'whizzes',
  POSTGRES_USER = 'whizzes',
  POSTGRES_PASSWORD = 'whizzes',
} = process.env;

const config: Record<'production' | 'development' | 'testing', Config> = {
  production: {
    client: 'postgresql',
    connection: {
      host: PGHOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      port: 5432,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../../migrations',
    },
  },
  development: {
    client: 'postgresql',
    connection: {
      host: PGHOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      port: 5432,
    },
    debug: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: '../../migrations',
    },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    debug: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: '../../migrations',
    },
  },
};

export default config;
