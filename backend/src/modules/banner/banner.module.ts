import { Module } from '@nestjs/common';

import { AwsS3Module } from '../../infrastructure/aws/aws-s3.module';
import { BannerController } from './controller/banner.controller';
import { BannerService } from './services/banner.service';

@Module({
  imports: [AwsS3Module],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
