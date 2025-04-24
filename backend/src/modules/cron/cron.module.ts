import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TokenCleanupService } from './service/cron.service';

@Module({
  imports: [AuthModule],
  providers: [TokenCleanupService],
})
export class CronModule {}
