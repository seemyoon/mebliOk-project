import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CustomerInfoEntity } from '../../postgres/entities/customer-info.entity';

@Injectable()
export class CustomerInfoRepository extends Repository<CustomerInfoEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CustomerInfoEntity, dataSource.manager);
  }
}
