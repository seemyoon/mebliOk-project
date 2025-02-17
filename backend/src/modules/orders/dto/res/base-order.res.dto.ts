import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';

import { UserResDto } from '../../../user/models/res/user.res.dto';
import { QuantityFurnitureInOrderDto } from '../req/quantity-furniture-in-order.dto';

export class BaseOrderResDto {
  @ApiProperty({
    example: '1',
    description: 'Order ID',
  })
  id: number;
  @ApiProperty({
    example: [
      { id: '6744s24-5a28-a363-a5e1-023ae2e4780f', quantity: 3 },
      { id: 'abc123-xyz456', quantity: 0 },
      { id: 'new789-new456', quantity: 5 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  furniture: QuantityFurnitureInOrderDto[];
  isReady: boolean;
  user: UserResDto;
  created: Date;
  updated: Date;
}
