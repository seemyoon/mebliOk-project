import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { OrderID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';

@Entity(TableNameEnum.ORDER)
export class OrderEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: OrderID;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @Column('boolean', { default: false })
  isReady?: boolean;
}
