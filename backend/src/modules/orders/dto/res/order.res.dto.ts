import { PickType } from '@nestjs/swagger';

import { BaseOrderResDto } from './base-order.res.dto';

export class OrderResDto extends PickType(BaseOrderResDto, [
  'id',
  'orderPhoneNumber',
  'orderEmail',
  'deliveryType',
  'shippingMethod',
  'furniture',
  'user',
  'isReady',
  'created',
  'updated',
]) {}
