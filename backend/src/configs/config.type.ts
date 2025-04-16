import { ObjectCannedACL } from '@aws-sdk/client-s3';

export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  aws: AWSConfig;
  jwt: JwtConfig;
  googleAuth: GoogleAuthConfig;
  mail: MailConfig;
  actionToken: ActionTokenConfig;
  appFrontUrl: AppFrontUrl;
};

export type AppConfig = {
  port: number;
  host: string;
};
export type AWSConfig = {
  accessKey: string;
  secretKey: string;
  region: string;
  bucket_name: string;
  ACL: ObjectCannedACL;
  endpoint: string;
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

export type ActionTokenConfig = {
  actionTokenForgotPasswordSecret: string;
  actionTokenForgotPasswordExpireIn: number;
  actionTokenVerifyEmailSecret: string;
  actionTokenVerifyEmailExpireIn: number;
};

export type AppFrontUrl = {
  appFrontUrl: string;
};

export type GoogleAuthConfig = {
  google_client_id: string;
  google_client_secret: string;
  callback_url: string;
};

export type MailConfig = {
  email: string;
  password: string;
};
