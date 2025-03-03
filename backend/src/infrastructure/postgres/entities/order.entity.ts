import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserID } from '../../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
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
