import { CurrencyEnum } from '../../../modules/furniture/enum/currency.enum';

export interface ICurrencyResponse {
  ccy: CurrencyEnum;
  base_ccy: CurrencyEnum;
  buy: string;
  sale: string;
}
