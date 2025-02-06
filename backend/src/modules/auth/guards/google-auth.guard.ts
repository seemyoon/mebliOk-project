import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('GoogleAuthGuard HANDLE REQUEST:', { err, user, info });
    if (err || info) {
      const errorMessage =
        err?.message ||
        info?.message ||
        'An unknown error occurred during authentication';
      throw new BadRequestException(errorMessage);
    }

    return user;
  }
}
