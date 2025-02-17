import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

import { FurnitureID } from '../../../../common/types/entity-ids.type';

export class QuantityFurnitureInOrderDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Furniture ID',
  })
  id: FurnitureID;
  @ApiProperty({
    example: 2,
    description: 'Quantity of the furniture in the order.',
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
