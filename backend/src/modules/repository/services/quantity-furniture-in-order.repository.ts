import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { QuantityFurnitureInOrderEntity } from '../../../database/entities/quantity-furniture-in-order.entity';

@Injectable()
export class QuantityFurnitureInOrderRepository extends Repository<QuantityFurnitureInOrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(QuantityFurnitureInOrderEntity, dataSource.manager);
  }
}
