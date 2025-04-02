import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Config, JwtConfig } from '../../../configs/config.type';
import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UserMapper } from '../../user/services/user.mapper';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { IUserData } from '../interfaces/user-data.interface';
import { TokenType } from '../models/enums/token-type.enum';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly configService: ConfigService<Config>,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    public readonly tokenService: TokenService,
  ) {
    const jwtConfig = configService.get<JwtConfig>('jwt');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.refreshSecret,
      passReqToCallback: true,
      ignoreExpiration: true,
    });
  }

  public async validate(req: Request, payload: JwtPayload): Promise<IUserData> {
    const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const isValid = await this.tokenService.validate(
      refreshToken,
      TokenType.REFRESH,
    );

    if (!isValid) throw new UnauthorizedException('Invalid token');

    const isRefreshTokenExist =
      await this.refreshTokenRepository.isRefreshTokenExist(refreshToken);

    if (!isRefreshTokenExist)
      throw new UnauthorizedException('token is missing');

    const user = await this.userRepository.findUser(payload.userId);

    if (!user) throw new UnauthorizedException('invalid token');

    return UserMapper.toIUserData(user, payload.deviceId);
  }
}
