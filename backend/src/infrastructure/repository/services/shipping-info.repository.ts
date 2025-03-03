import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ShippingInfoEntity } from '../../postgres/entities/shipping-info.entity';

@Injectable()
export class ShippingInfoRepository extends Repository<ShippingInfoEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ShippingInfoEntity, dataSource.manager);
  }
}
