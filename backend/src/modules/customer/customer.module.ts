import { Module } from '@nestjs/common';

import { CustomerInfoController } from './controller/customer-info.controller';
import { CustomerInfoService } from './services/customer-info.service';

@Module({
  controllers: [CustomerInfoController],
  providers: [CustomerInfoService],
})
export class CustomerModule {}
