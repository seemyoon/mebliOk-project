import { ShippingInfoID } from '../../../../common/types/entity-ids.type';

export class ShippingInfoResDto {
  id: ShippingInfoID;
  title: string;
  description: string;
  body: string;
  photos?: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}
