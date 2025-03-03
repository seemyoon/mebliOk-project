import { Injectable } from '@nestjs/common';

import { RedisService } from '../../../infrastructure/redis/services/redis.service';
import { CurrencyEnum } from '../enum/currency.enum';

@Injectable()
export class CurrencyService {
  constructor(private readonly redisService: RedisService) {}
  public async saveCurrency(
    currency: CurrencyEnum,
    amount: number,
  ): Promise<void> {
    const key = this.getKey(currency);
    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, amount.toString());
  }

  public async getCurrency(currency: CurrencyEnum): Promise<number> {
    const key = this.getKey(currency);
    const set = await this.redisService.sMembers(key);
    return parseFloat(set[0]);
  }

  private getKey(currency: CurrencyEnum): string {
    return `CURRENCY:${currency}`;
  }
}