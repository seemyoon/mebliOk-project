import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UserMapper } from '../../user/services/user.mapper';
import { TokenType } from '../models/enums/token-type.enum';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const refreshToken = req.get('Authorization')?.split('Bearer ')[1];

    if (!refreshToken) throw new UnauthorizedException();

    const payload = await this.tokenService.verifyAuthTokens(
      refreshToken,
      TokenType.REFRESH,
    );

    if (!payload) throw new UnauthorizedException();

    const isRefreshTokenExist =
      await this.refreshTokenRepository.isRefreshTokenExist(refreshToken);

    if (!isRefreshTokenExist) throw new UnauthorizedException();

    const user = await this.userRepository.findOneBy({ id: payload.userId });

    if (!user) throw new UnauthorizedException();

    req.res.locals.user = UserMapper.toIUserData(user);
    return true;
  }
}
