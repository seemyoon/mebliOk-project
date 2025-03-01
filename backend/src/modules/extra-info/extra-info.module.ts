import { Module } from '@nestjs/common';

import { ExtraInfoController } from './controller/extra-info.controller';
import { ExtraInfoService } from './services/extra-info.service';

@Module({
  controllers: [ExtraInfoController],
  providers: [ExtraInfoService],
})
export class ExtraInfoModule {}
