import { Injectable } from '@nestjs/common';

import { CustomerInfoEntity } from '../../../infrastructure/postgres/entities/customer-info.entity';
import { ListCustomersInfoQueryDto } from '../dto/req/list-customers-info-query.dto';
import { ListCustomersInfoResDto } from '../dto/res/customer-info-list-res-dto';
import { CustomerInfoResDto } from '../dto/res/customer-info-res.dto';

@Injectable()
export class CustomerInfoMapper {
  public static toResDto(data: CustomerInfoEntity): CustomerInfoResDto {
    return {
      id: data.id,
      name: data.name,
      phoneNumber: data.phoneNumber,
    };
  }

  public static toResDtoList(
    data: CustomerInfoEntity[],
    total: number,
    query: ListCustomersInfoQueryDto,
  ): ListCustomersInfoResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
