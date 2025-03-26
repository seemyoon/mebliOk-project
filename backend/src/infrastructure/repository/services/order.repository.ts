import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IUserData } from '../../../modules/auth/interfaces/user-data.interface';
import { ListOrdersQueryDto } from '../../../modules/orders/dto/req/list-orders.query.dto';
import { OrderEntity } from '../../postgres/entities/order.entity';
import { UserID } from '../../../common/types/entity-ids.type';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.manager);
  }

  public async findParticularClientOrders(
    query: ListOrdersQueryDto,
    userId: UserID,
  ): Promise<[OrderEntity[], number]> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.quantityFurniture', 'quantityFurniture')
      .leftJoinAndSelect('quantityFurniture.furniture', 'furniture');

    qb.where('user.id = :userId', { userId });

    if (query.ready !== undefined) {
      qb.where('order.isReady = :isReady');
      qb.setParameter('isReady', query.ready);
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findOrders(
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.quantityFurniture', 'quantityFurniture')
      .leftJoinAndSelect('quantityFurniture.furniture', 'furniture');

    if (query.ready !== undefined) {
      qb.where('order.isReady = :isReady');
      qb.setParameter('isReady', query.ready);
    }

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
      .where('order.user_id = :userId', { userId: userData.userId })
      .take(query.limit)
      .skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findByOrderId(orderID: number): Promise<OrderEntity> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect('order.quantityFurniture', 'quantityFurniture')
      .leftJoinAndSelect('quantityFurniture.furniture', 'furniture')
      .leftJoinAndSelect('order.user', 'user');

    qb.where('order.id = :orderID', { orderID });
    return await qb.getOne();
  }

  public async findMyOrder(
    orderID: number,
    userData: IUserData,
  ): Promise<OrderEntity> {
    const qb = this.createQueryBuilder('order');
    qb.leftJoinAndSelect('order.quantityFurniture', 'quantityFurniture')
      .leftJoinAndSelect('quantityFurniture.furniture', 'furniture')
      .leftJoinAndSelect('order.user', 'user');

    const order = await this.findByOrderId(orderID);
    if (order.user_id === userData.userId) {
      qb.where('order.user_id = :userId', { userId: userData.userId });
      qb.where('order.id = :orderID', { orderID });
    } else {
      throw new NotFoundException('Order not found');
    }
    return await qb.getOne();
  }
}
