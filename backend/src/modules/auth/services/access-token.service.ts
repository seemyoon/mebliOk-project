import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserID } from '../../../common/types/entity-ids.type';
import {
  ActionTokenConfig,
  Config,
  JwtConfig,
} from '../../../configs/config.type';
import { RedisService } from '../../../infrastructure/redis/services/redis.service';
import { ActionTokenTypeEnum } from '../models/enums/action-token-type.enum';

@Injectable()
export class AccessTokenService {
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
    actionTokenType: ActionTokenTypeEnum,
  ): Promise<void> {
    if (actionTokenType === ActionTokenTypeEnum.FORGOT_PASSWORD) {
      const key = `ACTION_TOKEN_FORGOT_PASSWORD:${userId}:${deviceId}`;
      await this.redisService.deleteByKey(key);
      await this.redisService.addOneToSet(key, token);
      await this.redisService.expire(
        key,
        this.actionToken.actionTokenForgotPasswordExpireIn,
      );
    } else if (actionTokenType === ActionTokenTypeEnum.VERIFY_EMAIL) {
      const key = `ACTION_TOKEN_VERIFY_EMAIL:${userId}:${deviceId}`;
      await this.redisService.deleteByKey(key);
      await this.redisService.addOneToSet(key, token);
      await this.redisService.expire(
        key,
        this.actionToken.actionTokenForgotPasswordExpireIn,
      );
    }
  }

  public async isAccessTokenExist(
    userId: string,
    deviceId: string,
    token: string,
  ): Promise<any> {
    const key = `ACCESS_TOKEN:${userId}:${deviceId}`;
    const set = await this.redisService.sMembers(key);
    return set.includes(token);
  }

  public async deleteToken(userId: string, deviceId: string): Promise<void> {
    const key = `ACCESS_TOKEN:${userId}:${deviceId}`;
    await this.redisService.deleteByKey(key);
  }
}
