import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { OrdersController } from './controller/orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [AuthModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
