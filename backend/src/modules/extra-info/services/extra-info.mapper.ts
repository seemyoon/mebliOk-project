import { Injectable } from '@nestjs/common';

import { PaymentInfoEntity } from '../../../database/entities/payment-info.entity';
import { ShippingInfoEntity } from '../../../database/entities/shipping-info.entity';
import { PaymentInfoResDto } from '../dto/res/payment-info.res.dto';
import { ShippingInfoResDto } from '../dto/res/shipping-info.res.dto';

@Injectable()
export class ExtraInfoMapper {
  public static toResShippingInfoDto(
    data: ShippingInfoEntity,
  ): ShippingInfoResDto {
    return {
      id: data.id,
      title: data?.title,
      photos: data.photos ? data.photos.map((photo) => photo) : [],
      description: data?.description,
      body: data?.body,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
  public static toResPaymentInfoDto(
    data: PaymentInfoEntity,
  ): PaymentInfoResDto {
    return {
      id: data.id,
      title: data?.title,
      description: data?.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
