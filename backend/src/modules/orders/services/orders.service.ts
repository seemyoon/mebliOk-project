import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { OrderEntity } from '../../../database/entities/order.entity';
import { UserEntity } from '../../../database/entities/users.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { FurnitureRepository } from '../../repository/services/furniture.repository';
import { OrderRepository } from '../../repository/services/order.repository';
import { QuantityFurnitureInOrderRepository } from '../../repository/services/quantity-furniture-in-order.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserEnum } from '../../user/enum/users.enum';
import { BaseOrderReqDto } from '../dto/req/base-order.req.dto';
import { EditOrderReqDto } from '../dto/req/edit-order.req.dto';
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
    orderID: number,
    query: ListOrdersQueryDto,
  ): Promise<[OrderEntity[], number]> {
    return await this.orderRepository.findClientsOrders(orderID, query);
  }

  public async createOrder(
    userData: IUserData,
    dto: BaseOrderReqDto,
  ): Promise<OrderEntity> {
    let user: UserEntity | null = null;
    if (userData) {
      user = await this.userRepository.findUser(userData.userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
    } else if (dto.phoneNumber) {
      user = await this.userRepository.findOne({
        where: [{ phoneNumber: dto.phoneNumber }, { email: dto?.email }],
      });

      if (!user) {
        user = this.userRepository.create({
          phoneNumber: dto.phoneNumber,
          email: dto?.email,
          name: dto?.user_name,
          role: UserEnum.UNREGISTERED_CLIENT,
        });
        await this.userRepository.save(user);
      }
    } else {
      throw new ConflictException(
        'You need to specify a phone number or register on the platform',
      );
    }

    const furnitureList = await Promise.all(
      dto.furniture.map(async (oneFurniture) => {
        const furniture = await this.furnitureRepository.findByFurnitureId(
          oneFurniture.id,
        );
        if (!furniture) {
          throw new NotFoundException(
            `Product with id ${furniture.id} not found`,
          );
        }
        return { furniture, quantity: oneFurniture.quantity };
      }),
    );

    const order = await this.orderRepository.save(
      this.orderRepository.create({ user }),
    );

    const quantityFurnitureInOrder = furnitureList.map((furnitureItem) => {
      return this.quantityFurnitureInOrderRepository.create({
        order_id: order.id,
        furniture_id: furnitureItem.furniture.id,
        quantity: furnitureItem.quantity,
      });
    });

    await this.quantityFurnitureInOrderRepository.save(
      quantityFurnitureInOrder,
    );

    return order;
  }

  public async editClientOrder(
    orderId: number,
    dto: EditOrderReqDto,
  ): Promise<OrderEntity> {
    const order = await this.orderRepository.findByOrderId(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (dto?.furniture?.length) {
      const furnitureList = await this.furnitureRepository.find({
        where: { id: In(dto.furniture.map((item) => item.id)) },
      });

      if (furnitureList.length !== dto.furniture.length) {
        throw new NotFoundException('One or more furniture items not found');
      }

      const existingFurniture =
        await this.quantityFurnitureInOrderRepository.find({
          where: { order_id: order.id },
        });

      const newFurnitureIds = dto.furniture.map((item) => item.id);

      const toDelete = existingFurniture.filter(
        (item) => !newFurnitureIds.includes(item.furniture_id),
      );

      if (toDelete.length) {
        await this.quantityFurnitureInOrderRepository.delete({
          id: In(toDelete.map((item) => item.id)),
        });
      }

      for (const item of dto.furniture) {
        const existingItems = existingFurniture.filter(
          (quantityFurnitureInOrder) =>
            quantityFurnitureInOrder.furniture_id === item.id,
        );
        for (const existing of existingItems) {
          existing.quantity = item?.quantity;
          await this.quantityFurnitureInOrderRepository.save(existing);
        }
      }

      const newItems = dto.furniture.filter(
        (item) => !existingFurniture.some((f) => f.furniture_id === item.id),
      );

      const toInsert = newItems.map((item) =>
        this.quantityFurnitureInOrderRepository.create({
          order_id: order.id,
          furniture_id: item.id,
          quantity: item.quantity,
        }),
      );

      if (toInsert.length) {
        await this.quantityFurnitureInOrderRepository.save(toInsert);
      }
    }

    return order;
  }

  public async getOrder(orderId: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findByOrderId(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  public async pickOrderIsDoneOrNot(orderId: number): Promise<void> {
    const order = await this.orderRepository.findByOrderId(orderId);
    if (!order) {
      throw new ConflictException('order not found');
    }
    if (order.isReady == true) order.isReady = false;
    else if (order.isReady == false) order.isReady = true;

    await this.orderRepository.save(order);
  }
}
