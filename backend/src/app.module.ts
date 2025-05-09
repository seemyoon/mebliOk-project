import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TypeORMQueryExceptionFilter } from './common/filters/postgres-exception.filter';
import configuration from './configs/configuration';
import { ApiModule } from './infrastructure/api/api.module';
import { PostgresModule } from './infrastructure/postgres/postgres.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { AuthModule } from './modules/auth/auth.module';
import { BannerModule } from './modules/banner/banner.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ColorModule } from './modules/color/color.module';
import { CustomerInfoModule } from './modules/customer-info/customer-info.module';
import { ExtraInfoModule } from './modules/extra-info/extra-info.module';
import { FurnitureModule } from './modules/furniture/furniture.module';
import { HealthModule } from './modules/health/health.module';
import { LoggerModule } from './modules/logger/logger.module';
import { MailModule } from './modules/mail/mail.module';
import { MaterialModule } from './modules/material/material.module';
import { OrdersModule } from './modules/orders/orders.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { UserModule } from './modules/user/user.module';
import { CronModule } from './modules/cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    CronModule,
    LoggerModule,
    RedisModule,
    FurnitureModule,
    PostgresModule,
    ColorModule,
    MailModule,
    MaterialModule,
    OrdersModule,
    BrandModule,
    ApiModule,
    CategoriesModule,
    AuthModule,
    UserModule,
    RepositoryModule,
    StatisticModule,
    HealthModule,
    ExtraInfoModule,
    BannerModule,
    CustomerInfoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TypeORMQueryExceptionFilter,
    },
  ],
})
export class AppModule {}
