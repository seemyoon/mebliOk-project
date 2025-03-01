import { Module } from '@nestjs/common';

import { FurnitureStatisticController } from './controller/furniture-statistic.controller';
import { FurnitureStatisticService } from './services/furniture-statistic.service';

@Module({
  controllers: [FurnitureStatisticController],
  providers: [FurnitureStatisticService],
})
export class StatisticModule {}
