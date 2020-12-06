declare namespace NodeJS {
  export type Environment = 'production' | 'development' | 'testing';

  export interface ProcessEnv {
    NODE_ENV: Environment;
    PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    JWT_SECRET: string;
  }
}
