import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { LoggerService } from '../../logger/services/logger.service';

@Injectable()
export class TokenCleanupService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly authCacheService: AuthCacheService,
  ) {}

  @Cron(CronExpression.EVERY_4_HOURS)
  public async hangleAccessTokenCleanUp(): Promise<void> {
    await this.authCacheService.deleteAllAccessTokens();
    this.loggerService.log(`deleted all access tokens`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public async handleRefreshTokenCleanUp(): Promise<void> {
    const res = await this.refreshTokenRepository.deleteExpiredTokens();
    this.loggerService.log(`deleted ${res.affected} expired refresh tokens`);
  }
}
