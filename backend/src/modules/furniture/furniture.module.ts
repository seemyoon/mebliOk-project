import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { FurnitureController } from './controller/furniture.controller';
import { FurnitureService } from './service/furniture.service';

@Module({
  imports: [AuthModule, FileStorageModule],
  controllers: [FurnitureController],
  providers: [FurnitureService],
})
export class FurnitureModule {}
