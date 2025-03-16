import { UserResDto } from '../../../user/models/res/user.res.dto';
import {
  QuantityFurnitureInOrderDto,
} from '../req/quantity-furniture-in-order.dto';

export class BaseOrderResDto {
  id: number;
  quantityFurniture: QuantityFurnitureInOrderDto[];
  isReady: boolean;
  user: UserResDto;
  created: Date;
  updated: Date;
}
