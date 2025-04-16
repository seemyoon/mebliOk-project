import { Module } from '@nestjs/common';

import { OrdersController } from './controller/orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
