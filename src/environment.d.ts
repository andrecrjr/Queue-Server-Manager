declare global {
    namespace NodeJS {
      interface ProcessEnv {
        REDIS_ENDPOINT: string;
        NODE_ENV: 'development' | 'production';
        REDIS_PORT?: string;
      }
    }
  }