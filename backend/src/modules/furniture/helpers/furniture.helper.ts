import { Injectable } from '@nestjs/common';

import { CurrencyEnum } from '../../currency/enum/currency.enum';
import { CurrencyConverterHelper } from '../../currency/helpers/currency-converter.helper';
import { CurrencyService } from '../../currency/services/currency.service';

@Injectable()
export class FurnitureHelper {
  public static async getConvertedPrice(
    currencyService: CurrencyService,
    currency: CurrencyEnum,
    price: number,
  ): Promise<{ currencyRate: number; priceInUAH: number }> {
    const currencyRate = await currencyService.getCurrency(currency);
    const priceInUAH = await CurrencyConverterHelper.convertInUAH(
      currency,
      price,
      currencyService,
    );
    return { currencyRate, priceInUAH };
  }
}
