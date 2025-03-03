import { CurrencyEnum } from '../enum/currency.enum';
import { CurrencyService } from '../services/currency.service';

export class CurrencyConverterHelper {
  public static async convertInUAH(
    currency: CurrencyEnum,
    amount: number,
    currencyService: CurrencyService,
  ): Promise<number> {
    if (currency === CurrencyEnum.UAH) {
      return amount;
    }
    const currencyRate = await currencyService.getCurrency(currency);
    return Math.round(amount * currencyRate);
  }
}
