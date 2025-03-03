import { Module } from '@nestjs/common';

import { RedisModule } from '../../infrastructure/redis/redis.module';
import { CurrencyModule } from '../currency/currency.module';
import { PriceService } from './services/price.service';

@Module({
  imports: [RedisModule, CurrencyModule],
  providers: [PriceService],
})
export class PriceModule {}
