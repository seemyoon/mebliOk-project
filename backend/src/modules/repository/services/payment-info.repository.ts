import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PaymentInfoEntity } from '../../../database/entities/payment-info.entity';

@Injectable()
export class PaymentInfoRepository extends Repository<PaymentInfoEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PaymentInfoEntity, dataSource.manager);
  }
}
