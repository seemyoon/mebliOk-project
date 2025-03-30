import { UserResDto } from '../../../user/models/res/user.res.dto';
import { ShippingMethodEnum } from '../../enums/shipping-method.enum';
import { QuantityFurnitureInOrderDto } from '../req/quantity-furniture-in-order.dto';
import { DeliveryTypeResDto } from './delivery-type.res.dto';

export class BaseOrderResDto {
  id: number;
  orderPhoneNumber: string;
  orderEmail: string;
  deliveryType: DeliveryTypeResDto;
  furniture: QuantityFurnitureInOrderDto[];
  isReady: boolean;
  shippingMethod: ShippingMethodEnum;
  user: UserResDto;
  created: Date;
  updated: Date;
}
