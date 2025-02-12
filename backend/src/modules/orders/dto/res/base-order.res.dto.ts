import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';

import { OrderID } from '../../../../common/types/entity-ids.type';
import { UserResDto } from '../../../user/models/res/user.res.dto';
import { ProductOrderDto } from '../req/furniture-order.dto';

export class BaseOrderResDto {
  @ApiProperty({ type: String })
  id: OrderID;
  @ApiProperty({
    example: [
      { furnitureId: 'furniture1-id', quantity: 2 },
      { furnitureId: 'furniture2-id', quantity: 3 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  furniture: ProductOrderDto[];
  isReady: boolean;
  user: UserResDto;
  created: Date;
  updated: Date;
}
