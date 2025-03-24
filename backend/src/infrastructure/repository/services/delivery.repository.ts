import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DeliveryEntity } from '../../postgres/entities/delivery.entity';

@Injectable()
export class DeliveryRepository extends Repository<DeliveryEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(DeliveryEntity, dataSource.manager);
  }
}
