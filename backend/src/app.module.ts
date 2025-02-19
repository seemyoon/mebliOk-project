import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import configuration from './configs/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ColorModule } from './modules/color/color.module';
import { FurnitureModule } from './modules/furniture/furniture.module';
import { LoggerModule } from './modules/logger/logger.module';
import { MaterialModule } from './modules/material/material.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LoggerModule,
    RedisModule,
    FurnitureModule,
    PostgresModule,
    ColorModule,
    MaterialModule,
    OrdersModule,
    BrandModule,
    CategoriesModule,
    AuthModule,
    UserModule,
    RepositoryModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
