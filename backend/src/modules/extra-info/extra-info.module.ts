import { Module } from '@nestjs/common';

import { FileStorageModule } from '../../infrastructure/file-storage/file-storage.module';
import { ExtraInfoController } from './controller/extra-info.controller';
import { ExtraInfoService } from './services/extra-info.service';

@Module({
  imports: [FileStorageModule],
  controllers: [ExtraInfoController],
  providers: [ExtraInfoService],
})
export class ExtraInfoModule {}
