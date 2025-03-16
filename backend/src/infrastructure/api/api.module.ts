import { Module } from '@nestjs/common';

import { CurrencyService } from './service/currency.service';

@Module({
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class ApiModule {}
