import { Injectable } from '@nestjs/common';

import { CustomerInfoID } from '../../../common/types/entity-ids.type';
import { CustomerInfoEntity } from '../../../infrastructure/postgres/entities/customer-info.entity';
import { CustomerInfoRepository } from '../../../infrastructure/repository/services/customer-info.repository';
import { CreateCustomerInfoReqDto } from '../dto/req/create-customer-info.req.dto';
import { ListCustomersInfoQueryDto } from '../dto/req/list-customers-info-query.dto';
import { UpdateCustomerReqDto } from '../dto/req/update-customer.req.dto';

@Injectable()
export class CustomerInfoService {
  constructor(
    private readonly customerInfoRepository: CustomerInfoRepository,
  ) {}

  public async getAllCustomersInfo(
    query: ListCustomersInfoQueryDto,
  ): Promise<[CustomerInfoEntity[], number]> {
    return {} as [CustomerInfoEntity[], number];
  }

  public async addCustomerInfo(
    dto: CreateCustomerInfoReqDto,
  ): Promise<CustomerInfoEntity> {
    return {} as CustomerInfoEntity;
  }

  public async getCustomerInfo(
    customerInfoId: CustomerInfoID,
  ): Promise<CustomerInfoEntity> {
    return {} as CustomerInfoEntity;
  }

  public async editCustomerInfo(
    dto: UpdateCustomerReqDto,
  ): Promise<CustomerInfoEntity> {
    return {} as CustomerInfoEntity;
  }
}
