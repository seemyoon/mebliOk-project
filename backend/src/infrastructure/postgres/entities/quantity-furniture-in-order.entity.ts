import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  FurnitureID,
  QuantityFurnitureInOrderEntityID,
} from '../../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { FurnitureEntity } from './furniture.entity';
import { OrderEntity } from './order.entity';

@Entity(TableNameEnum.QUANTITY_FURNITURE_IN_ORDER)
export class QuantityFurnitureInOrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: QuantityFurnitureInOrderEntityID;

  @Column()
  order_id: number;
  @ManyToOne(() => OrderEntity, (entity) => entity.quantityFurniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order?: OrderEntity;

  @Column({ type: 'uuid' })
  furniture_id: FurnitureID;
  @ManyToOne(() => FurnitureEntity, (entity) => entity.quantityFurniture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'furniture_id' })
  furniture?: FurnitureEntity;

  @Column('decimal')
  quantity: number;
}
