import { IsNumber, IsUUID } from 'class-validator';

import { FurnitureID } from '../../../../common/types/entity-ids.type';

export class QuantityFurnitureInOrderDto {
  @IsUUID()
  id: FurnitureID;
  @IsNumber()
  quantity: number;
}
