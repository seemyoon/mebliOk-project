import { Module } from '@nestjs/common';

import { FileStorageModule } from '../../infrastructure/file-storage/file-storage.module';
import { BannerController } from './controller/banner.controller';
import { BannerService } from './services/banner.service';

@Module({
  imports: [FileStorageModule],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
