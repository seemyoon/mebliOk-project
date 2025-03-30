import { DeliveryID } from '../../../../common/types/entity-ids.type';

export class DeliveryTypeResDto {
  id: DeliveryID;
  deliveryPlace: string;
  address: string;
  comment?: string;
}
