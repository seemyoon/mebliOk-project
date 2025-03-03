import { Module } from '@nestjs/common';

import { RedisModule } from '../../infrastructure/redis/redis.module';
import { CurrencyService } from './services/currency.service';

@Module({
  imports: [RedisModule],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
