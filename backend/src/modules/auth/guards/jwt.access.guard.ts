import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IsNull } from 'typeorm';

import { UserRepository } from '../../repository/services/user.repository';
import { UserMapper } from '../../user/services/user.mapper';
import { SKIP_AUTH } from '../decorators/skip-auth.decorator';
import { TokenType } from '../models/enums/token-type.enum';
import { AccessTokenService } from '../services/access-token.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AccessTokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;
    const req = context.switchToHttp().getRequest();
    const accessToken = req.get('Authorization')?.split('Bearer ')[1];

    if (!accessToken) throw new UnauthorizedException();

    const payload = await this.tokenService.verifyAuthTokens(
      accessToken,
      TokenType.ACCESS,
    );

    if (!payload) throw new UnauthorizedException();

    const isAccessTokenExist = await this.authCacheService.isAccessTokenExist(
      payload.userId,
      accessToken,
    );
    if (!isAccessTokenExist) throw new UnauthorizedException();

    const user = await this.userRepository.findOneBy({
      id: payload.userId,
      deleted: IsNull(),
    });
    if (!user) throw new UnauthorizedException();

    req.res.locals.user = UserMapper.toIUserData(user);
    return true;
  }
}
