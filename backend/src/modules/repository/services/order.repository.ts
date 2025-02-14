import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { OrderID, UserID } from '../../../common/types/entity-ids.type';
import { OrderEntity } from '../../../database/entities/order.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ListOrdersQueryDto } from '../../orders/dto/req/list-orders.query.dto';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.manager);
  }

  public async findOrders(
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.quantityFurniture', 'quantityFurniture')
      .leftJoinAndSelect('quantityFurniture.furniture', 'furniture');

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findMyOrders(
    userData: IUserData,
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect('order.quantityFurniture', 'quantityFurniture')
      .leftJoinAndSelect('quantityFurniture.furniture', 'furniture')
      .where('order.user_id = :userId', { userData: userData.userId })
      .take(query.limit)
      .skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findClientsOrders(
    orderId: OrderID,
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect('order.quantityFurniture', 'quantityFurniture')
      .leftJoinAndSelect('quantityFurniture.furniture', 'furniture')
      .where('order.id = :orderId', { orderId })
      .take(query.limit)
      .skip(query.offset);

    return await qb.getManyAndCount();
  }
}
