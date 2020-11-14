declare namespace NodeJS {
  export interface ProcessEnv {
    ENVIRONMENT: 'production' | 'development' | 'testing';
    PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    JWT_SECRET: string;
  }
}
