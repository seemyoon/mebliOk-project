import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FurnitureID, OrderID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { BaseOrderReqDto } from '../dto/req/base-order.req.dto';
import { ListOrdersQueryDto } from '../dto/req/list-orders.query.dto';
import { OrderResDto } from '../dto/res/order.res.dto';
import { OrdersListResDto } from '../dto/res/orders-list.res.dto';
import { OrdersMapper } from '../services/orders.mapper';
import { OrdersService } from '../services/orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER, UserEnum.REGISTERED_CLIENT)
  @Get('getAllOrders')
  public async getAllOrders(
    @Query() query: ListOrdersQueryDto,
  ): Promise<OrdersListResDto> {
    const [entities, total] = await this.ordersService.getAllOrders(query);
    return OrdersMapper.toResDtoList(entities, total, query);
  }

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.REGISTERED_CLIENT)
  @Get('getMyOrders')
  public async getMyOrders(
    @CurrentUser() userData: IUserData,
    @Query() query: ListOrdersQueryDto,
  ): Promise<OrdersListResDto> {
    const [entities, total] = await this.ordersService.getMyOrders(
      userData,
      query,
    );
    return OrdersMapper.toResDtoList(entities, total, query);
  }

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Get('getClientOrders')
  public async getClientOrders(
    @Param('orderId', ParseUUIDPipe) orderId: OrderID,
    @Query() query: ListOrdersQueryDto,
  ): Promise<OrdersListResDto> {
    const [entities, total] = await this.ordersService.getClientOrders(
      orderId,
      query,
    );
    return OrdersMapper.toResDtoList(entities, total, query);
  }

  @SkipAuth()
  @Post('createOrder')
  public async createOrder(
    @Param('furnitureID', ParseUUIDPipe) furnitureID: FurnitureID,
    @Body() dto: BaseOrderReqDto,
    @CurrentUser() userData?: IUserData,
  ): Promise<OrderResDto> {
    return OrdersMapper.toResDto(
      await this.ordersService.createOrder(userData, dto, furnitureID),
    );
  }

  // @UseGuards(RolesGuard)
  // @ROLES(UserEnum.REGISTERED_CLIENT)
  // @Post('editOrder/:orderId')
  // public async editOrder(
  //   @CurrentUser() userData: IUserData,
  //   @Body() dto: EditOrderReqDto,
  // ): Promise<OrderResDto> {
  //   return OrdersMapper.toResDto(
  //     await this.ordersService.editOrder(userData, dto),
  //   );
  // }
  //
  // @UseGuards(RolesGuard)
  // @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  // @Post('editClientOrder/:orderId')
  // public async editClientOrder(
  //   @Body() dto: EditOrderReqDto,
  //   @CurrentUser() userData?: IUserData,
  // ): Promise<OrderResDto> {
  //   return OrdersMapper.toResDto(
  //     await this.ordersService.editClientOrder(userData, dto),
  //   );
  // }

  @Post('pickOrderIsDoneOrNot/:orderId')
  public async pickOrderIsDoneOrNot(
    @Param('orderId', ParseUUIDPipe) orderId: OrderID,
  ): Promise<void> {
    await this.ordersService.pickOrderIsDoneOrNot(orderId);
  }

  // @Get(':orderId')
  // public async getOrder(
  //   @Param('orderId', ParseUUIDPipe) orderId: OrderID,
  // ): Promise<OrderResDto> {
  //   return OrdersMapper.toResDto(await this.ordersService.getOrder(orderId));
  // }
}
