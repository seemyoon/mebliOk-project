import { Module } from '@nestjs/common';

import { CategoriesController } from './controller/categories.controller';
import { CategoriesService } from './services/categories.service';
import { AwsS3Module } from '../../infrastructure/aws/aws-s3.module';

@Module({
  imports: [AwsS3Module],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
