import { ConflictException, Injectable } from '@nestjs/common';

import { FurnitureID } from '../../../common/types/entity-ids.type';
import { CalculateRateFurnitureEntity } from '../../../database/entities/calculate-rate-furniture.entity';
import { CalculateRateFurnitureRepository } from '../../repository/services/calculate-rate-furniture.repository';
import { FurnitureStatisticRepository } from '../../repository/services/furniture-statistic.repository';
import { UpdateCalculateFurnitureRateReqDto } from '../dto/req/update-calculate-furniture-rate.req.dto';
import { FurnitureStatisticBaseResDto } from '../dto/res/furniture-statistic-base.res.dto';

@Injectable()
export class FurnitureStatisticService {
  constructor(
    private readonly furnitureStatisticRepository: FurnitureStatisticRepository,
    private readonly calculateRateFurnitureRepository: CalculateRateFurnitureRepository,
  ) {}

  public async getCalculateFurnitureRate(): Promise<CalculateRateFurnitureEntity> {
    const count = await this.calculateRateFurnitureRepository.count();

    if (count > 1) {
      throw new ConflictException('CalculateRateFurniture must be only one!');
    }

    let calculateRateFurniture =
      await this.calculateRateFurnitureRepository.findOne({ where: {} });

    if (!calculateRateFurniture) {
      calculateRateFurniture = await this.calculateRateFurnitureRepository.save(
        this.calculateRateFurnitureRepository.create({
          order_criterion: 70,
          view_criterion: 30,
        }),
      );
    }

    return calculateRateFurniture;
  }

  public async editCalculateFurnitureRate(
    dto: UpdateCalculateFurnitureRateReqDto,
  ): Promise<CalculateRateFurnitureEntity> {
    const count = await this.calculateRateFurnitureRepository.count();

    if (count > 1) {
      throw new ConflictException('CalculateRateFurniture must be only one!');
    }
    const calculateRateFurniture =
      await this.calculateRateFurnitureRepository.findOne({ where: {} });

    calculateRateFurniture.order_criterion = dto?.order_criterion;
    calculateRateFurniture.view_criterion = dto?.view_criterion;

    await this.calculateRateFurnitureRepository.save(calculateRateFurniture);

    return calculateRateFurniture;
  }

  public async getFurnitureStatistic(
    furnitureId: FurnitureID,
  ): Promise<FurnitureStatisticBaseResDto> {
    const getNumberOfViews =
      await this.furnitureStatisticRepository.getNumberOfViews(furnitureId);
    const getDailyViews =
      await this.furnitureStatisticRepository.getDailyViews(furnitureId);
    const getWeeklyViews =
      await this.furnitureStatisticRepository.getWeeklyViews(furnitureId);
    const getMonthlyViews =
      await this.furnitureStatisticRepository.getMonthlyViews(furnitureId);
    return {
      furnitureId,
      getNumberOfViews,
      getDailyViews,
      getWeeklyViews,
      getMonthlyViews,
    };
  }
}
