import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Config, JwtConfig } from '../../../configs/config.type';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UserMapper } from '../../user/services/user.mapper';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { TokenType } from '../models/enums/token-type.enum';
import { AuthCacheService } from '../services/auth-cache.service';
import { TokenService } from '../services/token.service';
import { IUserData } from '../interfaces/user-data.interface';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService<Config>,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
  ) {
    const jwtConfig = configService.get<JwtConfig>('jwt');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.accessSecret,
      ignoreExpiration: false,
      passReqToCallback: true, // Pass the request to the validate method
    });
  }

  public async validate(req: Request, payload: JwtPayload): Promise<IUserData> {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!accessToken) {
      throw new UnauthorizedException('Token is lost');
    }

    await this.tokenService.validate(accessToken, TokenType.ACCESS);

    const isAccessTokenExist = await this.authCacheService.isAccessTokenExist(
      payload.userId,
      payload.deviceId,
      accessToken,
    );

    if (!isAccessTokenExist)
      throw new UnauthorizedException('Token is missing');

    const user = await this.userRepository.findUser(payload.userId);

    if (!user) throw new UnauthorizedException('Invalid token');

    return UserMapper.toIUserData(user, payload.deviceId);
  }
}
