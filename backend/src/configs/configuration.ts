import * as process from 'node:process';

import { ObjectCannedACL } from '@aws-sdk/client-s3';

import { Config } from './config.type';

export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3200,
    host: process.env.APP_HOST || 'localhost',
  },
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
    bucket_name: process.env.AWS_S3_BUCKET_NAME,
    ACL: process.env.AWS_S3_ACL as ObjectCannedACL,
    endpoint: process.env.AWS_S3_ENDPOINT,
  },
  appFrontUrl: {
    appFrontUrl: process.env.APP_FRONT_URL,
  },
  mail: {
    email: process.env.SMTP_EMAIL,
    password: process.env.SMTP_PASSWORD,
  },
  actionToken: {
    actionTokenSecret: process.env.ACTION_ACCESS_SECRET,
    actionTokenExpiration: parseInt(process.env.ACTION_ACCESS_EXPIRATION),
  },
  jwt: {
    accessSecret: process.env.ACCESS_SECRET,
    accessExpireIn: parseInt(process.env.ACCESS_EXPIREIN, 10) || 3600,
    refreshSecret: process.env.REFRESH_SECRET,
    refreshExpireIn: parseInt(process.env.REFRESH_EXPIREIN, 10) || 8640,
  },
  googleAuth: {
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    callback_url: process.env.CALLBACK_URL,
  },
});
