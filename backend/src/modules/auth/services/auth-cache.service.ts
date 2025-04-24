import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserID } from '../../../common/types/entity-ids.type';
import {
  ActionTokenConfig,
  Config,
  JwtConfig,
} from '../../../configs/config.type';
import { RedisService } from '../../../infrastructure/redis/services/redis.service';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JwtConfig;
  private actionToken: ActionTokenConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get<JwtConfig>('jwt');
    this.actionToken = this.configService.get<ActionTokenConfig>('actionToken');
  }

  public async saveToken(
    token: string,
    userId: string,
    deviceId: string,
  ): Promise<void> {
    const key = `ACCESS_TOKEN:${userId}:${deviceId}`;

    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.accessExpireIn);
  }

  public async saveActionToken(
    token: string,
    userId: UserID,
    deviceId: string,
  ): Promise<void> {
    const key = `ACTION_TOKEN:${userId}:${deviceId}`;
    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.actionToken.actionTokenExpiration);
  }

  public async isActionTokenExist(
    userId: string,
    deviceId: string,
    token: string,
  ): Promise<boolean> {
    const key = `ACTION_TOKEN:${userId}:${deviceId}`;
    const set = await this.redisService.sMembers(key);
    return set.includes(token);
  }

  public async isAccessTokenExist(
    userId: string,
    deviceId: string,
    token: string,
  ): Promise<boolean> {
    const key = `ACCESS_TOKEN:${userId}:${deviceId}`;
    const set = await this.redisService.sMembers(key);
    return set.includes(token);
  }

  public async deleteAllAccessTokens(): Promise<void> {
    const pattern = `ACCESS_TOKEN:*`;
    const keys = await this.redisService.keys(pattern);
    for (const key of keys) {
      await this.redisService.deleteByKey(key);
    }
  }

  public async deleteToken(userId: string, deviceId: string): Promise<void> {
    const key = `ACCESS_TOKEN:${userId}:${deviceId}`;
    await this.redisService.deleteByKey(key);
  }
}
