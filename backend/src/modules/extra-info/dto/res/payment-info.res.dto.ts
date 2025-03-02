import { PaymentInfoID } from '../../../../common/types/entity-ids.type';

export class PaymentInfoResDto {
  id: PaymentInfoID;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
