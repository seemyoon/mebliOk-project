import { Injectable } from '@nestjs/common';

import { OrderEntity } from '../../../infrastructure/postgres/entities/order.entity';
import { QuantityFurnitureInOrderEntity } from '../../../infrastructure/postgres/entities/quantity-furniture-in-order.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { ListOrdersQueryDto } from '../dto/req/list-orders.query.dto';
import { QuantityFurnitureInOrderDto } from '../dto/req/quantity-furniture-in-order.dto';
import { OrderResDto } from '../dto/res/order.res.dto';
import { OrdersListResDto } from '../dto/res/orders-list.res.dto';

@Injectable()
export class OrdersMapper {
  private static mapOrderFurniture(
    quantityFurnitureInOrder: QuantityFurnitureInOrderEntity,
  ): QuantityFurnitureInOrderDto {
    return {
      id: quantityFurnitureInOrder.furniture.id,
      quantity: quantityFurnitureInOrder?.quantity,
    };
  }

  public static toResDto(order: OrderEntity): OrderResDto {
    return {
      id: order?.id,
      furniture: order.quantityFurniture.map(OrdersMapper.mapOrderFurniture),
      isReady: order.isReady,
      user: order.user ? UserMapper.toResDto(order.user) : null,
      created: order?.createdAt,
      updated: order?.updatedAt,
    };
  }

  public static toResDtoList(
    data: OrderEntity[],
    total: number,
    query: ListOrdersQueryDto,
  ): OrdersListResDto {
    return { data: data.map(this?.toResDto), total, ...query };
  }
}
