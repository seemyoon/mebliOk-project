import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserID } from '../../../common/types/entity-ids.type';
import { ShippingMethodEnum } from '../../../modules/orders/enums/shipping-method.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { DeliveryEntity } from './delivery.entity';
import { QuantityFurnitureInOrderEntity } from './quantity-furniture-in-order.entity';
import { UserEntity } from './users.entity';

@Entity(TableNameEnum.ORDER)
export class OrderEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('boolean', { default: false })
  isReady?: boolean;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @Column({ type: 'enum', enum: ShippingMethodEnum, nullable: true }) // todo. nullable: true is temporally
  shippingMethod?: ShippingMethodEnum;

  @OneToOne(() => DeliveryEntity, (entity) => entity.order)
  deliveryType?: DeliveryEntity;

  @OneToMany(() => QuantityFurnitureInOrderEntity, (entity) => entity.order, {
    cascade: true,
  })
  quantityFurniture?: QuantityFurnitureInOrderEntity[];

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
