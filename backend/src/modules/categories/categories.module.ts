import { Module } from '@nestjs/common';

import { CategoriesController } from './controller/categories.controller';
import { CategoriesService } from './services/categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
