import { Injectable } from '@nestjs/common';

import { OrderEntity } from '../../../database/entities/order.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { ListOrdersQueryDto } from '../dto/req/list-orders.query.dto';
import { OrderResDto } from '../dto/res/order.res.dto';
import { OrdersListResDto } from '../dto/res/orders-list.res.dto';

@Injectable()
export class OrdersMapper {
  private static mapOrderFurniture(orderProduct: any): any {
    //todo fix any
    return {};
  }

  public static toResDto(order: OrderEntity): OrderResDto {
    return {
      id: order.id,
      furniture: (order.quantityFurniture || []).map((furniture) =>
        OrdersMapper.mapOrderFurniture(furniture),
      ),
      isReady: order.isReady,
      user: order.user ? UserMapper.toResDto(order.user) : null,
      created: order.createdAt,
      updated: order.updatedAt,
    };
  }

  public static toResDtoList(
    data: OrderEntity[],
    total: number,
    query: ListOrdersQueryDto,
  ): OrdersListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
