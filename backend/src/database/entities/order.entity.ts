import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../model/create-update.model';
import { OrdersAllEntity } from './order-all.entity';
import { UserEntity } from './users.entity';

@Entity(TableNameEnum.ORDER)
export class OrderEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: OrderID;

  @Column('boolean', { default: false })
  isReady?: boolean;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @OneToMany(() => OrdersAllEntity, (ordersAll) => ordersAll.order, {
    cascade: true,
  })
  ordersAll?: OrdersAllEntity[];

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
