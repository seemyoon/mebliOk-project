import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CalculateRateFurnitureEntity } from '../../postgres/entities/calculate-rate-furniture.entity';

@Injectable()
export class CalculateRateFurnitureRepository extends Repository<CalculateRateFurnitureEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CalculateRateFurnitureEntity, dataSource.manager);
  }
}
