const {
  PGHOST = '127.0.0.1',
  POSTGRES_DB = 'teatime',
  POSTGRES_USER = 'teatime',
  POSTGRES_PASSWORD = 'teatime',
} = process.env;

const defaultConfig = {
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
    directory: './migrations',
  },
};

const config: Record<'production' | 'development' | 'testing', unknown> = {
  production: {
    ...defaultConfig,
  },
  development: {
    ...defaultConfig,
  },
  testing: {
    ...defaultConfig,
  },
};

export default config;
