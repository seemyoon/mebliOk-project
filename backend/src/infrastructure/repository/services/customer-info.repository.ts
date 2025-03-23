import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CustomerInfoID } from '../../../common/types/entity-ids.type';
import { ListCustomersInfoQueryDto } from '../../../modules/customer/dto/req/list-customers-info-query.dto';
import { CustomerInfoEntity } from '../../postgres/entities/customer-info.entity';

@Injectable()
export class CustomerInfoRepository extends Repository<CustomerInfoEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CustomerInfoEntity, dataSource.manager);
  }

  public async findAll(
    query: ListCustomersInfoQueryDto,
  ): Promise<[CustomerInfoEntity[], number]> {
    const qb = this.createQueryBuilder('customerInfo');
    if (query.search) {
      qb.where('customerInfo.name ILIKE: search');
      qb.setParameter('search', `%${query.search}%`);
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findByCustomerInfoId(
    customerInfoId: CustomerInfoID,
  ): Promise<CustomerInfoEntity> {
    const qb = this.createQueryBuilder('customerInfo');
    qb.where('customerInfo.id = :customerInfoId', { customerInfoId });

    return await qb.getOne();
  }
}
