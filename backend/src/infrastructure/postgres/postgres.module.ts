import * as path from 'node:path';
import * as process from 'node:process';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config, DatabaseConfig } from '../../configs/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<Config>) => {
        const config = configService.get<DatabaseConfig>('database');
        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.database,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'infrastructure',
              'postgres',
              'entities',
              '*.entity.js',
            ),
          ],
          migrations: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'infrastructure',
              'postgres',
              'migrations',
              '*.js',
            ),
          ],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}
