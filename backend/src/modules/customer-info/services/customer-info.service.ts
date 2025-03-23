import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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
    return await this.customerInfoRepository.findAll(query);
  }

  public async addCustomerInfo(
    dto: CreateCustomerInfoReqDto,
  ): Promise<CustomerInfoEntity> {
    const customerInfo = await this.customerInfoRepository.findOne({
      where: [{ name: dto.name }, { phoneNumber: dto.phoneNumber }],
    });
    if (customerInfo)
      throw new ConflictException('Customer info  is already exist');

    return await this.customerInfoRepository.save(
      this.customerInfoRepository.create({
        name: dto.name,
        phoneNumber: dto.phoneNumber,
      }),
    );
  }

  public async getCustomerInfo(
    customerInfoId: CustomerInfoID,
  ): Promise<CustomerInfoEntity> {
    const customerInfo =
      await this.customerInfoRepository.findByCustomerInfoId(customerInfoId);
    if (!customerInfo) throw new NotFoundException('Customer info not found');

    return customerInfo;
  }

  public async editCustomerInfo(
    dto: UpdateCustomerReqDto,
    customerInfoId: CustomerInfoID,
  ): Promise<CustomerInfoEntity> {
    const customerInfo =
      await this.customerInfoRepository.findByCustomerInfoId(customerInfoId);
    if (!customerInfo) throw new NotFoundException('Customer info not found');

    customerInfo.phoneNumber = dto.phoneNumber;
    customerInfo.name = dto.name;

    return await this.customerInfoRepository.save(customerInfo);
  }
}
