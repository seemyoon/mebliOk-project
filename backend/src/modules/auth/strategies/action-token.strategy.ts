import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { ActionTokenConfig } from '../../../configs/config.type';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { IUserData } from '../interfaces/user-data.interface';
import { UserMapper } from '../../user/services/user.mapper';
import { TokenService } from '../services/token.service';
import { TokenType } from '../models/enums/token-type.enum';
import { AuthCacheService } from '../services/auth-cache.service';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';

@Injectable()
export class ActionTokenStrategy extends PassportStrategy(
  Strategy,
  'action-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
  ) {
    const actionTokenConfig =
      configService.get<ActionTokenConfig>('actionToken');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: actionTokenConfig.actionTokenSecret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<IUserData> {
    const actionToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!actionToken) throw new UnauthorizedException('Token is lost');

    await this.tokenService.validate(actionToken, TokenType.ACTION);

    const isActionTokenExist = await this.authCacheService.isActionTokenExist(
      payload.userId,
      payload.deviceId,
      actionToken,
    );

    if (!isActionTokenExist)
      throw new UnauthorizedException('Token is missing');

    const user = await this.userRepository.findUser(payload.userId);
    return UserMapper.toIUserData(user, payload.deviceId);
  }
}
