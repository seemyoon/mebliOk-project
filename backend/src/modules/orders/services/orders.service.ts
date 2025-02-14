import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';

import { FurnitureID, OrderID } from '../../../common/types/entity-ids.type';
import { OrderEntity } from '../../../database/entities/order.entity';
import { UserEntity } from '../../../database/entities/users.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { FurnitureRepository } from '../../repository/services/furniture.repository';
import { OrderRepository } from '../../repository/services/order.repository';
import { QuantityFurnitureInOrderRepository } from '../../repository/services/quantity-furniture-in-order.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserEnum } from '../../user/enum/users.enum';
import { BaseOrderReqDto } from '../dto/req/base-order.req.dto';
import { ListOrdersQueryDto } from '../dto/req/list-orders.query.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly quantityFurnitureInOrderRepository: QuantityFurnitureInOrderRepository,
    private readonly furnitureRepository: FurnitureRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getAllOrders(
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    return await this.orderRepository.findOrders(query);
  }

  public async getMyOrders(
    userData: IUserData,
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    return await this.orderRepository.findMyOrders(userData, query);
  }

  public async getClientOrders(
    orderID: OrderID,
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    return await this.orderRepository.findClientsOrders(orderID, query);
  }

  public async createOrder(
    userData: IUserData,
    dto: BaseOrderReqDto,
    furnitureID: FurnitureID,
  ): Promise<OrderEntity> {
    let user: UserEntity | null = null;
    if (userData) {
      user = await this.userRepository.findUser(userData.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
    } else if (dto.phoneNumber) {
      user = await this.userRepository.findOne({
        where: [{ phoneNumber: dto.phoneNumber }, { email: dto.email }],
      });

      if (!user) {
        user = this.userRepository.create({
          phoneNumber: dto.phoneNumber,
          email: dto.email,
          name: dto.name,
          role: UserEnum.UNREGISTERED_CLIENT,
        });
        await this.userRepository.save(user);
      }
    } else {
      throw new ConflictException(
        'You need to specify a phone number or register on the platform',
      );
    }

    const QuantityFurnitureInOrder = dto.furniture.map((item) => item.quantity);
    const furnitureList = await this.furnitureRepository.find({
      where: { id: In(QuantityFurnitureInOrder) },
    });

    if (furnitureList.length !== QuantityFurnitureInOrder.length) {
      throw new NotFoundException('One or more furniture items not found');
    }

    const order = this.orderRepository.create({
      user,
      furniture: furnitureList.map((furniture, index) => ({
        furniture,
        quantity: dto.furniture[index].quantity,
      })),
    });

    await this.orderRepository.save(order);

    return order;
  }
  //
  // public async getOrder(orderId: OrderID): Promise<OrderEntity> {
  //   const order = await this.orderRepository.findOrder(orderId);
  //   if (!order) {
  //     throw new NotFoundException('Order not found');
  //   }
  //   return order;
  // }
  //
  public async pickOrderIsDoneOrNot(orderId: OrderID): Promise<void> {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new ConflictException('order not found');
    }
    if (order.isReady == true) order.isReady = false;
    else if (order.isReady == false) order.isReady = true;

    await this.orderRepository.save(order);
  }
}
