import { PickType } from '@nestjs/swagger';

import { BaseOrderResDto } from './base-order.res.dto';

export class OrderResDto extends PickType(BaseOrderResDto, [
  'id',
  'quantityFurniture',
  'user',
  'isReady',
  'created',
  'updated',
]) {}
