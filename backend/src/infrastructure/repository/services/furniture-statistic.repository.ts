import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FurnitureID } from '../../../common/types/entity-ids.type';
import { FurnitureStatisticEntity } from '../../postgres/entities/furniture-statistic.entity';

@Injectable()
export class FurnitureStatisticRepository extends Repository<FurnitureStatisticEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FurnitureStatisticEntity, dataSource.manager);
  }

  public async getNumberOfViews(furnitureId: FurnitureID): Promise<number> {
    const qb = await this.createQueryBuilder('furniture_statistic')
      .where('furniture_statistic.furniture_Id = :furnitureId', { furnitureId })
      .select('SUM(furniture_statistic.count_views)', 'numberOfViews')
      .getRawOne();
    return qb?.numberOfViews || 0;
  }

  // todo. fix getDailyViews, getWeeklyViews, getMonthlyViews
  public async getDailyViews(furnitureId: FurnitureID): Promise<number> {
    const qb = await this.createQueryBuilder('furniture_statistic')
      .leftJoinAndSelect('furniture_statistic.furniture', 'furniture')
      .where('furniture_statistic.furniture_id = :furnitureId', { furnitureId })
      .andWhere('DATE(furniture_statistic.createdAt) = CURRENT_DATE')
      .select('SUM(furniture_statistic.count_views)', 'dailyViews')
      .getRawOne();

    return qb?.dailyViews || 0;
  }

  public async getWeeklyViews(furnitureId: FurnitureID): Promise<number> {
    const qb = await this.createQueryBuilder('furniture_statistic')
      .leftJoinAndSelect('furniture_statistic.furniture', 'furniture')
      .where('furniture_statistic.furniture_id = :furnitureId', { furnitureId })
      .andWhere(
        'EXTRACT(week FROM furniture_statistic.createdAt) = EXTRACT(week FROM CURRENT_DATE)',
      )
      .andWhere(
        'EXTRACT(year FROM furniture_statistic.createdAt) = EXTRACT(year FROM CURRENT_DATE)',
      )
      .select('SUM(furniture_statistic.count_views)', 'weeklyViews')
      .getRawOne();

    return qb?.weeklyViews || 0;
  }

  public async getMonthlyViews(furnitureId: FurnitureID): Promise<number> {
    const qb = await this.createQueryBuilder('furniture_statistic')
      .leftJoinAndSelect('furniture_statistic.furniture', 'furniture')
      .where('furniture_statistic.furniture_id = :furnitureId', { furnitureId })
      .andWhere(
        'EXTRACT(MONTH FROM furniture_statistic.createdAt) = EXTRACT(MONTH FROM CURRENT_DATE)',
      )
      .andWhere(
        'EXTRACT(YEAR FROM furniture_statistic.createdAt) = EXTRACT(YEAR FROM CURRENT_DATE)',
      )
      .select('SUM(furniture_statistic.count_views)', 'monthlyViews')
      .getRawOne();

    return qb?.monthlyViews || 0;
  }
}
