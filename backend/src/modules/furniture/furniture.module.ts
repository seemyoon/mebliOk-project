import { Module } from '@nestjs/common';

import { AwsS3Module } from '../../infrastructure/aws/aws-s3.module';
import { AuthModule } from '../auth/auth.module';
import { FurnitureController } from './controller/furniture.controller';
import { FurnitureService } from './service/furniture.service';

@Module({
  imports: [AuthModule, AwsS3Module],
  controllers: [FurnitureController],
  providers: [FurnitureService],
})
export class FurnitureModule {}
