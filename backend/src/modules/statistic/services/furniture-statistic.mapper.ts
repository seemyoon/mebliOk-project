import { Injectable } from '@nestjs/common';

import { FurnitureID } from '../../../common/types/entity-ids.type';
import { CalculateRateFurnitureEntity } from '../../../database/entities/calculate-rate-furniture.entity';
import { FurnitureStatisticBaseResDto } from '../dto/res/furniture-statistic-base.res.dto';

@Injectable()
export class FurnitureStatisticMapper {
  public static toResDto(
    furnitureId: FurnitureID,
    getNumberOfViews: number,
    getDailyViews: number,
    getWeeklyViews: number,
    getMonthlyViews: number,
  ): FurnitureStatisticBaseResDto {
    return {
      furnitureId,
      getNumberOfViews,
      getDailyViews,
      getWeeklyViews,
      getMonthlyViews,
    };
  }

  public static toResCalculateFurnitureRateDto(
    data: CalculateRateFurnitureEntity,
  ): CalculateRateFurnitureEntity {
    return {
      id: data.id,
      order_criterion: data.order_criterion,
      view_criterion: data.view_criterion,
      updatedAt: data.updatedAt,
      createdAt: data.createdAt,
    };
  }
}
