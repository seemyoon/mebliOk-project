import { Module } from '@nestjs/common';

import { BrandController } from './controller/brand.controller';
import { BrandService } from './services/brand.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
