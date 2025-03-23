import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IsShowPriceEntity } from '../../postgres/entities/is-show-price.entity';

@Injectable()
export class IsShowPriceRepository extends Repository<IsShowPriceEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(IsShowPriceEntity, dataSource.manager);
  }
}
