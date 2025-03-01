import { Injectable } from '@nestjs/common';

import { ShippingInfoID } from '../../../common/types/entity-ids.type';
import { ShippingInfoRepository } from '../../repository/services/shipping-info.repository';

@Injectable()
export class ExtraInfoService {
  constructor(
    private readonly shippingInfoRepository: ShippingInfoRepository,
  ) {}

  public async getShippingInfo(shippingInfoId: ShippingInfoID): Promise<void> {}

  public async editShippingInfo(
    shippingInfoId: ShippingInfoID,
  ): Promise<void> {}
}
