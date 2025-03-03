import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IUserData } from '../../../modules/auth/interfaces/user-data.interface';
import { ListOrdersQueryDto } from '../../../modules/orders/dto/req/list-orders.query.dto';
import { OrderEntity } from '../../postgres/entities/order.entity';

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
    orderId: number,
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

  public async findByOrderId(orderID: number): Promise<OrderEntity> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect(
      'order.quantityFurniture',
      'quantityFurniture',
    ).leftJoinAndSelect('order.user', 'user');

    qb.where('order.id = :orderID', { orderID });
    return await qb.getOne();
  }
}
