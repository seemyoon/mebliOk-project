export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  jwt: JwtConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};

export type JwtConfig = {
  accessSecret: string;
  accessExpireIn: number;
  refreshSecret: string;
  refreshExpireIn: number;
};
