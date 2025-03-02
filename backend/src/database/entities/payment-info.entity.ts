import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { PaymentInfoID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';

@Entity(TableNameEnum.PAYMENT_INFO)
export class PaymentInfoEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: PaymentInfoID;

  @Column('text')
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
