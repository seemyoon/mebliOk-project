import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import configuration from './src/configs/configuration';

dotenv.config({ path: './environments/local.env' });

const config = configuration().database;

export default new DataSource({
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [
    path.join(
      process.cwd(),
      'src',
      'infrastructure',
      'postgres',
      'entities',
      '*.entity.ts',
    ),
  ],
  migrations: [
    path.join(
      process.cwd(),
      'src',
      'infrastructure',
      'postgres',
      'migrations',
      '*.ts',
    ),
  ],
  synchronize: false,
});
