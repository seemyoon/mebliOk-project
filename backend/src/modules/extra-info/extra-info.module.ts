import { Module } from '@nestjs/common';

import { AwsS3Module } from '../../infrastructure/aws/aws-s3.module';
import { ExtraInfoController } from './controller/extra-info.controller';
import { ExtraInfoService } from './services/extra-info.service';

@Module({
  imports: [AwsS3Module],
  controllers: [ExtraInfoController],
  providers: [ExtraInfoService],
})
export class ExtraInfoModule {}
