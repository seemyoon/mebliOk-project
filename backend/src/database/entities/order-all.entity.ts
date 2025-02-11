import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  FurnitureID,
  OrderID,
  OrdersAllID,
} from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { FurnitureEntity } from './furniture.entity';
import { OrderEntity } from './order.entity';

@Entity(TableNameEnum.ORDERS_ALL)
export class OrdersAllEntity {
  @PrimaryGeneratedColumn('uuid')
  id: OrdersAllID;

  @Column()
  order_id: OrderID;
  @ManyToOne(() => OrderEntity, (order) => order.ordersAll, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order?: OrderEntity;

  @Column()
  furniture_id: FurnitureID;
  @ManyToOne(() => FurnitureEntity, (furniture) => furniture.ordersAll, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'furniture_id' }) //todo. add changes to rep level
  furniture?: FurnitureEntity;

  @Column('decimal')
  quantity: number;
}
