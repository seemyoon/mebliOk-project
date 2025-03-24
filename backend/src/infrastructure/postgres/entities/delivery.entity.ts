import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DeliveryID } from '../../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { OrderEntity } from './order.entity';

@Entity(TableNameEnum.DELIVERY)
export class DeliveryEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: DeliveryID;

  @Column('text')
  deliveryPlace: string;

  @Column('text')
  address: string;

  @Column('text', { nullable: true })
  comment?: string;

  @Column()
  order_id: number;
  @OneToOne(() => OrderEntity, (entity) => entity.deliveryType, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
}
