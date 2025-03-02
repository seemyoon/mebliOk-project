import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ShippingInfoID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';

@Entity(TableNameEnum.SHIPPING_INFO)
export class ShippingInfoEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: ShippingInfoID;

  @Column('text')
  title: string;

  @Column('json', { nullable: true })
  photos?: string[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  body: string;
}
