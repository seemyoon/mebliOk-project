import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

import { FurnitureRepository } from '../../../infrastructure/repository/services/furniture.repository';
import { CurrencyService } from '../../currency/services/currency.service';
import { API_URL_PRIVAT24 } from '../../../constants/common.constants';

@Injectable()
export class PriceService {
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly furnitureRepository: FurnitureRepository,
  ) {}

  private readonly logger = new Logger(PriceService.name);
  private axiosInstance = axios.create({
    baseURL: API_URL_PRIVAT24,
  });
  getCurrency = async () => {
    try {
      const { data } = await this.axiosInstance.get(
        this.axiosInstance.defaults.baseURL,
      );
      for (const item of data) {
        await this.currencyService.saveCurrency(item.ccy, item.sale);
      }
    } catch (error) {
      this.logger.error(error);
    }
  };

  updateCurrency = async () => {
    try {
      const offers = await this.furnitureRepository.find();
      for (const offer of offers) {
        const currency = await this.currencyService.getCurrency(offer.currency);
        const newPrice = offer.price * currency;
        await this.furnitureRepository.update(offer.id, {
          priceInUAH: newPrice,
          currencyRate: currency,
        });
      }
    } catch (error) {
      this.logger.error(error);
    }
  };

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    this.updateCurrency();
  }
  @Cron(CronExpression.EVERY_2_HOURS)
  handleCurrencyCron() {
    this.getCurrency();
  }
}
