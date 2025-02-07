import { Module } from '@nestjs/common';

import { FurnitureController } from './controller/furniture.controller';
import { FurnitureService } from './service/furniture.service';

@Module({
  imports: [],
  controllers: [FurnitureController],
  providers: [FurnitureService],
})
export class FurnitureModule {}
