import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { BaseOrderReqDto } from '../dto/req/base-order.req.dto';
import { EditOrderReqDto } from '../dto/req/edit-order.req.dto';
import { ListOrdersQueryDto } from '../dto/req/list-orders.query.dto';
import { OrderResDto } from '../dto/res/order.res.dto';
import { OrdersListResDto } from '../dto/res/orders-list.res.dto';
import { OrdersMapper } from '../services/orders.mapper';
import { OrdersService } from '../services/orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Get('/getAllOrders')
  public async getAllOrders(
    @Query() query: ListOrdersQueryDto,
  ): Promise<OrdersListResDto> {
    const [entities, total] = await this.ordersService.getAllOrders(query);
    return OrdersMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER, UserEnum.REGISTERED_CLIENT)
  @Get('/getMyOrders')
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

  @SkipAuth()
  @ApiOperation({
    summary: 'In JSON you need to change data. Default: admin data',
  })
  @Post('/createOrder')
  public async createOrder(@Body() dto: BaseOrderReqDto): Promise<OrderResDto> {
    return OrdersMapper.toResDto(await this.ordersService.createOrder(dto));
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Post('/editClientOrder/:orderId')
  public async editClientOrder(
    @Body() dto: EditOrderReqDto,
    @Param('orderId') orderId: number,
  ): Promise<OrderResDto> {
    return OrdersMapper.toResDto(
      await this.ordersService.editClientOrder(+orderId, dto),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Patch('/pickOrderIsDoneOrNot/:orderId')
  public async pickOrderIsDoneOrNot(
    @Param('orderId') orderId: string,
  ): Promise<void> {
    await this.ordersService.pickOrderIsDoneOrNot(+orderId);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.REGISTERED_CLIENT, UserEnum.ADMIN, UserEnum.MANAGER)
  @Get('/getMyOrder/:orderId')
  public async getMyOrder(
    @CurrentUser() userData: IUserData,
    @Param('orderId') orderId: string,
  ): Promise<OrderResDto> {
    return OrdersMapper.toResDto(
      await this.ordersService.getMyOrder(+orderId, userData),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Get(':orderId')
  public async getOrder(
    @Param('orderId') orderId: string,
  ): Promise<OrderResDto> {
    return OrdersMapper.toResDto(await this.ordersService.getOrder(+orderId));
  }
}
