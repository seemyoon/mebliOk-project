import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { CurrencyEnum } from '../../../modules/furniture/enum/currency.enum';
import { API_URL_PRIVAT24 } from '../constants/common.constants';
import { ICurrencyResponse } from '../models/currency.interface';

@Injectable()
export class ApiService {
  private readonly logger = new Logger();
  private axiosCurrencyData: AxiosInstance = axios.create({
    baseURL: API_URL_PRIVAT24,
  });

  public async getCurrency(
    price: string,
    currency: CurrencyEnum,
  ): Promise<number> {
    try {
      const { data } = await this.axiosCurrencyData.get<ICurrencyResponse[]>(
        this.axiosCurrencyData.defaults.baseURL,
      );

      for (const item of data) {
        console.log(`Storing currency: ${item.ccy}, Sale rate: ${item.sale}`);
        switch (currency) {
          case CurrencyEnum.USD:
            if (item.ccy === 'USD') {
              return parseInt(price) / parseInt(item.sale);
            }
            break;
          case CurrencyEnum.EUR:
            if (item.ccy === 'EUR') {
              return parseInt(price) / parseInt(item.sale);
            }
            break;
          default:
            return parseInt(price);
        }
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
