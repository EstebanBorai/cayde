declare namespace NodeJS {
  export interface ProcessEnv {
    ENVIRONMENT: 'production' | 'development';
    PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
  }
}
