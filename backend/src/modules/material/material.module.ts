import { Module } from '@nestjs/common';

import { MaterialController } from './controller/material.controller';
import { MaterialService } from './services/material.service';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
