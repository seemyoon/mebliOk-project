import { PickType } from '@nestjs/swagger';

import { BaseOrderResDto } from './base-order.res.dto';

export class OrderResDto extends PickType(BaseOrderResDto, [
  'id',
  'furniture',
  'user',
  'isReady',
  'created',
  'updated',
]) {}
