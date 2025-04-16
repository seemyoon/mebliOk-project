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
import { AccessTokenService } from '../services/access-token.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService<Config>,
    private readonly tokenService: TokenService,
    private readonly accessTokenService: AccessTokenService,
  ) {
    const jwtConfig = configService.get<JwtConfig>('jwt');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.accessSecret,
      ignoreExpiration: false,
      passReqToCallback: true, // Pass the request to the validate method
    });
  }

  public async validate(req: Request, payload: JwtPayload) {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!accessToken) {
      throw new UnauthorizedException('token is lost');
    }

    const isValid = await this.tokenService.validate(
      accessToken,
      TokenType.ACCESS,
    );

    if (!isValid) throw new UnauthorizedException('invalid token');
    const isAccessTokenExist = await this.accessTokenService.isAccessTokenExist(
      payload.userId,
      payload.deviceId,
      accessToken,
    );

    if (!isAccessTokenExist)
      throw new UnauthorizedException('token is missing');

    const user = await this.userRepository.findUser(payload.userId);

    if (!user) throw new UnauthorizedException('invalid token');

    return UserMapper.toIUserData(user, payload.deviceId);
  }
}
