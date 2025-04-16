import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { SKIP_AUTH } from '../decorators/skip-auth.decorator';

@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt-access') {
  constructor(private readonly reflector: Reflector) {
    // Reflector is a tool for reading metadata (for example, what is written in decorators like @SkipAuth()).
    super();
  }

  canActivate(context: ExecutionContext) {
    // The method is called every time someone makes a request to a route protected by this guard.
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    return super.canActivate(context);
  }
}
